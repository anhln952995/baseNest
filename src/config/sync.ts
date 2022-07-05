import { sequelize } from './sequelize';

sequelize.sync({ force: false, alter: true, logging: console.log });
