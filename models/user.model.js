module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    estado: DataTypes.STRING,
    profesion: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return User;
};