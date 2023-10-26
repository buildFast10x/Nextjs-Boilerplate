
// Include Sequelize module.
import { Sequelize, DataTypes } from 'sequelize';

// Import sequelize object, 
// Database connection pool managed by Sequelize.
import { sequelizeInstance } from '../index';

const User = sequelizeInstance.define('User', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    subscriptionType: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

export default User;