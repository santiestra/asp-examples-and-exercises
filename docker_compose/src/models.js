const { Sequelize, DataTypes } = require('sequelize');

// IMPORTANT: we shouldn't keep configuration variables in the code
// const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/postgres') // Example for local
const sequelize = new Sequelize('postgres://postgres:password@host.docker.internal:5432/postgres') // Example for docker-compose

const Task = sequelize.define('Task', {
  // Model attributes are defined here
  title: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN
  }
}, {
});

Task.sync({ alter: true })

module.exports = {
  Task
};
