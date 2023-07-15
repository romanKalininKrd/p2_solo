const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userid' });
    }
  }
  Collection.init({
    userid: DataTypes.INTEGER,
    urls_thumb: DataTypes.TEXT,
    alt_description: DataTypes.TEXT,
    href: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};
