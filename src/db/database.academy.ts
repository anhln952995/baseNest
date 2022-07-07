import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';

import { User } from './models/users.model';
import { PupilInfo } from './models/pupil.info.model';
import { Organization } from './models/organization.model';

config();

const env = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.db_port,
};
console.log(env);
export const databaseAcademy = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(env.database, env.user, env.password, {
        host: env.host,
        dialect: 'mysql',
        logging: false,
        port: parseInt(env.port),
        // query: { raw: true },
        timezone: '+07:00',
        pool: {
          max: 30,
          min: 0,
          acquire: 60000,
          idle: 5000,
        },
      });
      sequelize.addModels([User, PupilInfo, Organization]);
      // await sequelize.sync({ force: false, alter: true });
      return sequelize;
    },
  },
];
