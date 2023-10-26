// const Sequelize = require('sequelize');
import {Sequelize} from 'sequelize';
import env_values from '@/config'
import mysql2 from 'mysql2';


const sequelizeInstance = new Sequelize(
    env_values.db.name, // Database Name
    env_values.db.username,       // Database Username
    env_values.db.password,  // Database Passowrd
    {
        dialect: 'mysql',
        dialectModule: mysql2,
        host: env_values.db.host,
        port: env_values.db.port
    }
);

async function intializeConnection() {
    try {
        await sequelizeInstance.authenticate();
        // console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export {
    intializeConnection,
    sequelizeInstance
};