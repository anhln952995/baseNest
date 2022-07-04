module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UIID,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          len: [6, 100],
        },
      },
    },
    {
      tableName: 'user',
    },
  );

  User.associate = (db) => {
    // db.User.belongsTo(db.DFProvince, {
    //   foreignKey: {
    //     name: 'province_id',
    //   },
    // });
    // db.User.hasOne(db.Agent, {
    //   foreignKey: { name: 'user_id' },
    // });
  };

  return User;
};
