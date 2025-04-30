import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Association,
  CreationOptional,
  NonAttribute,
  HasManyCreateAssociationMixin,
} from "sequelize";
import config from "../config";
import EntryImage from "./EntryImage";

class Entry extends Model<
  InferAttributes<Entry>,
  InferCreationAttributes<Entry>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare notes: string;
  declare timestamp: Date | null | undefined;

  declare images?: NonAttribute<EntryImage[]>;
  declare createImage: HasManyCreateAssociationMixin<EntryImage, "entryId">;

  declare static associations: {
    images: Association<Entry, EntryImage>;
  };
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
  },
  {
    sequelize: config.db,
    underscored: true,
  },
);

Entry.hasMany(EntryImage, { as: "images", foreignKey: { name: "entryId" } });

export default Entry;
