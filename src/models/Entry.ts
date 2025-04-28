import { Model, DataTypes } from 'sequelize';
import config from '../config';
import User from './User';

class Entry extends Model {
    declare id: number;
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
        sequelize: config.db,
        tableName: 'entries',
    }
);

User.hasMany(Entry);
Entry.belongsTo(User);

export default Entry;