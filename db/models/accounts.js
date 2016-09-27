module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Account', {
    broker_name: { type: DataTypes.STRING, allowNull: false },
    group_name: { type: DataTypes.STRING, allowNull: false },
    owner_name: { type: DataTypes.STRING },
    account_name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false }
    }, {
      getterMethods: {
        route: function () {
          return '/accounts/' + this.id;
        }
      }
    }
  );
};
