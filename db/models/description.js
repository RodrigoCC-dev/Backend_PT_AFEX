'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Description extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Description.belongsTo(models.Video, {foreignKey: 'videoId'})
    }
  }
  Description.init({
    partNumber: DataTypes.INTEGER,
    description: DataTypes.STRING(1234)
  }, {
    sequelize,
    modelName: 'Description',
    scopes: {
      dataOnly: {
        attributes: {exclude: ['videoId', 'createdAt', 'updatedAt']}
      }
    }
  });
  return Description;
};
