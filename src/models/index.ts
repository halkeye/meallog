import { Sequelize } from 'sequelize';
import { Entry } from './Entry';

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASSWORD as string, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // or 'postgres', 'sqlite', etc.
});

const models = {
    Entry: Entry.init(sequelize),
};

export { sequelize, models };