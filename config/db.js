const env = require("./env.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  logging: false,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../model/user")(sequelize, Sequelize);
db.activity = require("../model/activity")(sequelize, Sequelize);

db.user.hasMany(db.activity, {
  foreignKey: "userId",
});

db.activity.belongsTo(db.user, {
  foreignKey: "userId",
});

module.exports = db;
