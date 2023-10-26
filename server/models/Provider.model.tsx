
// Include Sequelize module.
import { Sequelize, DataTypes } from 'sequelize';

// Import sequelize object, 
// Database connection pool managed by Sequelize.
import { sequelizeInstance } from '../index';
import { getALLENUMValues } from '@/enums/LoginProviderEnum'

const Provider = sequelizeInstance.define('Provider', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    provider: {
        type: DataTypes.ENUM({
            values: getALLENUMValues()
        }),
        allowNull: false,
    },
    providerAccountId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    access_token: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    expires_at: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    sessionState: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,  
});

export default Provider;