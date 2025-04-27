import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Entry extends Model {
    public id!: number;
    public title!: string;
    public notes!: string;
    public timestamp!: Date;
    public imageUrls!: string[];

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Entry.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        imageUrls: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'entries',
    }
);

export default Entry;