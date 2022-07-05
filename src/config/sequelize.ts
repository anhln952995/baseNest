import { Sequelize } from 'sequelize';

const env = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.db_port,
};
console.log(env);
export const sequelize = new Sequelize(
  process.env.database,
  process.env.user,
  process.env.password,
  {
    host: process.env.host,
    dialect: 'mysql',
    logging: false,
    port: parseInt(process.env.db_port) || 3306,
    // query: { raw: true },
    timezone: '+07:00',
    pool: {
      max: 30,
      min: 0,
      acquire: 60000,
      idle: 5000,
    },
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // return sequelize.sync({ force: false, alter: true, logging: console.log });
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
