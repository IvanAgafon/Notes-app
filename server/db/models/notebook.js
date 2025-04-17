'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notebook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notebook.hasMany(models.Note, {
        foreignKey: 'notebookId',
        onDelete: 'CASCADE',
      });
      Notebook.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Notebook.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Notebook',
    },
  );
  return Notebook;
};
