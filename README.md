# Backend_PT_AFEX

## Entorno de desarrollo
* NodeJS v18.16
* npm v9.6.7
* PostgreSQL v12

## Instalación
La siguiente descripción de instalación se realiza considerando un sistema local con Ubuntu 20.04. Para otras distribuciones de sistemas operativos pueden haber variaciones en los comandos indicados.
### nvm-sh
*nvm-sh* es una herramienta que permite instalar múltiples versiones de NodeJS en el sistema, por lo cual permite elegir la versión específica a utilizar. Para su instalación se debe contar con cURL instalado:
```
sudo apt update
sudo apt install curl
```
Instalar *nvm-sh* a través del script de instalación proporcionado en la documentación oficial:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
Ejecutar el siguiente comando para que la consola del sistema reconozca las instrucciones de *nvm-sh* en las siguientes sesiones de trabajo:
```
source ~/.bashrc
```
Cerrar la sesión actual y volver a abrir la consola para continuar con la instalación.

### Node.js
Con la ayuda de *nvm-sh* ya es posible instalar la versión de *NodeJS* requerida a través del siguiente comando:
```
nvm install 18.16
```
Verificar la versión de *NodeJS* instalada:
```
node --version
```
Verificar la versión de npm instalada:
```
npm --version
```

### PostgreSQL
Instalar *PostgreSQL* en el sistema:
```
sudo apt install postgresql postgresql-contrib libpq-dev
```
Cambiar a usuario postgres e ingresar a la consola de postgres:
```
sudo su - postgres
psql
```
Crear un rol para el usuario actual, con permiso de creación de bases de datos y establecer su password de acceso:
```
create role 'tu_usuario' with createdb login password 'tu_password';
```
Crear la base de datos por defecto del nuevo rol creado:
```
create database 'tu_usuario';
```
Salir de la consola psql:
```
\q
```
Salir de la consola como usuario postgres:
```
exit
```
Probar acceso a psql con el nuevo usuario creado:
```
psql
```

### Clonar repositorio, instalar dependencias, y desplegar en entorno de desarrollo
Clonar el repositorio e ingresar al directorio de la aplicación:
```
git clone https://github.com/RodrigoCC-dev/Backend_PT_AFEX.git backend_pt_afex
cd backend_pt_afex
```
Generar archivo de variables de entorno de la aplicación copiando archivo .env-example a .env y editarlo:
```
cp .env-example .env
nano .env
```
Cambiar valores de variables de entorno:
```
PGUSER='tu_usuario'
PGHOST='tu_direccion_BD'  # ejemplo: 'localhost'
PGPASSWORD='password_usuario'
PGPORT=5432
CORS_ORIGINS='Direcciones CORS habilitadas, separadas por comas'  # ejemplo: *
PORT='Puerto de despliegue de la aplicación'  # ejemplo: 3000
```
Instalar dependencias:
```
npm install
```
Generar la base de datos de la aplicación:
```
npx sequelize db:create
npx sequelize db:migrate
```
Desplegar la aplicación en entorno de desarrollo:
```
npm run dev
```

## Despliegue en producción
### Instalación directa en el servidor
Las siguientes instrucciones de despliegue de la aplicación son las correspondientes para un servidor con distribución Ubuntu 20.04. Para otros sistemas operativos pueden haber variaciones en los comandos indicados. Se considera que ya se cuenta con la instalación de las dependencias señaladas en el apartado __Instalación__.

#### Configuración de la aplicación en producción
Ingresar al directorio de trabajo. Para ejemplificar se utiliza la carpeta */opt* del sistema. Clonar el repositorio con permisos de superusuario:
```
cd /opt
sudo git clone  https://github.com/RodrigoCC-dev/Backend_PT_AFEX.git backend_pt_afex
```
Cambiar los permisos de acceso a la carpeta de la aplicación e ingresar al directorio de la aplicación:
```
sudo chown -R tu-usuario.tu-usuario backend_pt_afex
sudo chmod -R 775 backend_pt_afex
cd backend_pt_afex
```
Crear el archivo de variables de entorno de la aplicación:
```
cp .env_example .env
nano .env
```
Establecer los parámetros de entorno según los valores de producción:
```
PGUSER='usuario_en_produccion'
PGHOST='host_BD_produccion'
PGPASSWORD='PASS_BD_produccion'
PGPORT=5432   # Puerto de la base de datos en producción
CORS_ORIGINS='Direcciones CORS separadas por comas'
PORT=3000     # Puerto de despliegue de la aplicación
```
Instalar las dependencias de la aplicación en entorno de producción:
```
NODE_ENV=production npm install
```
Inicializar la base de datos en producción:
```
npx sequelize --env=production db:create
npx sequelize --env=production db:migrate
```

#### Instalación de Nginx y arranque de la aplicación
La ejecución de la aplicación de forma directa solo queda *escuchando* en la dirección *localhost*, por lo tanto es necesario utilizar __Ngnix__ para redirigir las peticiones externas hacia la aplicación en *localhost*. Para la instalación de nginx se debe utilizar los siguientes comandos:
```
sudo apt install nginx
```
Editar el archivo *nginx.conf* de configuración de la aplicación:
```
nano nginx.conf
```
Ingresar el nombre del servidor y guardar los cambios:
```
server_name Nombre_de_tu_servidor;        # Ejemplo: www.example.com
```
Cambiar la configuración de Nginx a través del archivo de configuración de la aplicación y reiniciar el servicio con los siguientes comandos:
```
sudo cp ./nginx.conf /etc/nginx/conf.d/default.conf
sudo systemctl restart nginx
```
Arrancar la aplicación en producción
```
npm run server
```
La aplicación se ejecuta a través del manejador de procesos *pm2*. Para conocer mayores detalles de la manipulación de la aplicación, consultar la [documentación oficial de pm2](https://www.npmjs.com/package/pm2).

#### Cambiar la configuración de la ejecución de la aplicación en producción
El puerto utilizado por defecto por la aplicación en producción para *escuchar* las peticiones es el puerto 3000. Este valor puede ser cambiado en el archivo de variables de entorno, agregando el puerto a usar:
```
PORT=8080
```
Al cambiar este puerto, se debe corregir el archivo de configuración de *nginx* con el siguiente comando:
```
sudo nano /etc/nginx/conf.d/default.conf
```
Cambiar el puerto en la siguiente línea del archivo de configuración:
~~~
proxy_pass http://localhost:8080;
~~~
Luego, se debe reiniciar *nginx* para que considere los cambios realizados:
```
sudo systemctl restart nginx
```

### Actualizar la aplicación
Para actualizar la aplicación a su versión más reciente se debe ingresar a la carpeta de la aplicación y ejecutar:
```
cd /opt/backend_pt_afex
git pull
```
Instalar las nuevas dependencias de la aplicación:
```
NODE_ENV=production npm install
```
Instalar las nuevas migraciones en la base de datos. Estas nuevas migraciones deben ser instaladas según cada nuevo archivo agregado en esta actualización (se indica a continuación un ejemplo del comando a utilizar por cada archivo):
```
npx sequelize --env=production db:migrate --name 2023070106XXXX-nueva-migracion.js
```
Reiniciar la aplicación:
```
npx pm2 restart server
```

### Cambiar instalación a HTTPS
Para poder habilitar el tráfico __http__ seguro en la aplicación, es necesario contar con el certificado *SSL* del sitio. La obtención de este certificado se puede realizar a través de [Let's Encrypt](https://letsencrypt.org/es/) y __acme.sh__. Para mayor información, consultar la [documentación oficial de acme.sh](https://github.com/acmesh-official/acme.sh). Las instrucciones presentadas a continuación, asumen que ya se cuenta con los certificados respectivos.

Editar el archivo *nginx_ssl.conf* incluido en la carpeta raíz de la aplicación, señalando la ubicación de los archivos _.key_ y _.cer_ en las siguientes líneas:
```
ssl_certificate       /opt/server/certificates/cert_file.cer;
ssl_certificate_key   /opt/server/certificates/key_file.key;
```
Completar la configuración del archivo ingresando los valores necesarios en las siguientes líneas:
```
return 301 'Dirección_https_de_tu_sitio';       # Ej.: https://www.example.com

server_name _;                                  # Ej.: www.example.com
```
Reemplazar la configuración de Nginx a través del nuevo archivo de configuración de la aplicación y reiniciar el servicio con los siguientes comandos:
```
sudo cp ./nginx_ssl.conf /etc/nginx/conf.d/default.conf
sudo systemctl restart nginx
```
Habilitar el puerto 443 en el firewall de ubuntu para conexiones __https__ con Nginx:
```
sudo ufw allow 443/tcp
```

## Diseño
### Modelo entidad relación
Las entidades definidas para la base de datos, junto con las relaciones y tipos de datos configurados son las que se presentan a continuación en la siguiente imagen:

[![MER-AFEX-drawio-v-C.png](https://i.postimg.cc/8C68j7PM/MER-AFEX-drawio-v-C.png)](https://postimg.cc/kVqYHXSg)

### Endpoints y estructura de datos
#### Endpoints
Los *endpoints* de la aplicación, junto con los verbos HTTP de cada uno de ellos y los controladores que las ejecutan son los presentados a continuación:

| Endpoint    | Verbo       | Controlador             |
|:------------|:-----------:|:-----------------------:|
| /album      | GET         | albumController#index   |
| /album      | POST        | albumController#create  |
| /album/:id  | DELETE      | albumController#destroy |

#### Estructura de datos
Las estructuras de datos de los *endpoints* GET y POST anteriores se presentan a continuación según cada método del controlador:

* Estructura de datos entregada por el *endpoint* asociado a __albumController#index__:
```
[
  {
    id:
    youtubeId:
    title:
    mediumUrl:
    stdUrl:
    duration:
    Descriptions: [
      {
        id:
        partNumber:
        description:
      }
    ]
  }
]
```

* Estructura de datos a ser enviada al *endpoint* asociado a __albumController#create__
```
{
  videoId:
  title:
  description:
  mediumUrl:
  stdUrl:
  duration:
}
```
