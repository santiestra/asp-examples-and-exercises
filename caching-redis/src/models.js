const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const databaseUri = process.env["DATABASE_URI"];
const sequelize = new Sequelize(databaseUri);

const Organization = sequelize.define("Organization", {
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

const User = sequelize.define("User", {
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.DataTypes.STRING,
  },
});

User.prototype.generateHash = async function (password) {
  return bcrypt.hash(password, bcrypt.genSaltSync(8));
};

User.prototype.validPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

User.prototype.asJson = function () {
  return { email: this.email, organizationId: this.OrganizationId };
};

const Task = sequelize.define(
  "Task",
  {
    // Model attributes are defined here
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
  },
  {}
);

Organization.sync({ alter: true });

Task.belongsTo(Organization, {
  foreignKey: {
    allowNull: false,
  },
});

User.belongsTo(Organization, {
  foreignKey: {
    allowNull: false,
  },
});

User.sync({ alter: true });
Task.sync({ alter: true });

module.exports = {
  Task,
  Organization,
  User,
};
