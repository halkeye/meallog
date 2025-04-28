import { Model, DataTypes } from 'sequelize';
import config from '../config';

class User extends Model {
  declare id: number;
  public email!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: config.db,
    tableName: 'users',
  }
);

export default User;
