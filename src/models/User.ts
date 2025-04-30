import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyCreateAssociationMixin,
  NonAttribute,
} from "sequelize";
import { v6 as uuidv6 } from "uuid";
import config from "../config";
import Entry from "./Entry";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare publicUUID: CreationOptional<string>;

  declare entries?: NonAttribute<Entry[]>;
  declare createEntry: HasManyCreateAssociationMixin<Entry, "id">;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    publicUUID: {
      type: DataTypes.UUID,
      field: "public_uuid",
      defaultValue: () => uuidv6(),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: config.db,
    underscored: true,
  },
);

User.hasMany(Entry, { foreignKey: { name: "userId" } });

export default User;
