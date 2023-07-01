# Backend_PT_AFEX

## Entorno de desarrollo
NodeJS v18.16
npm v9.6.7
postgresql v12

## Instalación
La siguiente descripción de instalación se realiza considerando un sistema local con Ubuntu 20.04. Para otras distribuciones de sistemas operativos pueden haber variaciones en los comandos indicados.
### nvm-sh
nvm-sh es una herramienta que permite instalar múltiples versiones de NodeJS en el sistema, por lo cual permite elegir la versión específica a utilizar. Para su instalación se debe contar con cURL instalado:
```
sudo apt update
sudo apt install curl
```
Instalar nvm-sh a través del script de instalación proporcionado en la documentación oficial:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
Ejecutar el siguiente comando para que la consola del sistema reconozca las instrucciones de nvm-sh en las siguientes sesiones de trabajo:
```
source ~/.bashrc
```
Cerrar la sesión actual y volver a abrir la consola para continuar con la instalación.

### Node.js
Con la ayuda de nvm-sh ya es posible instalar la versión de NodeJS requerida a través del siguiente comando:
```
nvm install 18.16
```
Verificar la versión de NodeJS instalada:
```
node --version
```
Verificar la versión de npm instalada:
```
npm --version
```

### PostgreSQL
Instalar PostgreSQL en el sistema:
```
sudo apt install postgresql postgresql-contrib libpq-dev
```
Cambiar a usuario postgres e ingresar a la consola de postgres:
```
sudo su - postgres
psql
```
Crear un rol para el usuario actual, su base de datos por defecto y su password de acceso:
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
