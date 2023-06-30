'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Video.hasMany(models.Description, {foreignKey: 'videoId'})
    }
  }
  Video.init({
    youtubeId: DataTypes.STRING,
    title: DataTypes.STRING(1234),
    mediumUrl: DataTypes.STRING,
    stdUrl: DataTypes.STRING,
    duration: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Video',
    scopes: {
      dataOnly: {
        attributes: {exclude: ['createdAt', 'updatedAt']}
      }
    }
  });
  return Video;
};
