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

  declare day: Date | null | undefined;
}

Entry.init(
  {
    day: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.timestamp) {
          return this.timestamp;
        }
        const copiedDate = new Date(this.timestamp.getTime());
        copiedDate.setHours(0);
        copiedDate.setMinutes(0);
        copiedDate.setSeconds(0);
        copiedDate.setMilliseconds(0);
        return copiedDate;
      },
    },
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
    defaultScope: {
      attributes: {
        include: ["day"],
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["timestamp", "ASC"]],
    },
  },
);

Entry.hasMany(EntryImage, { as: "images", foreignKey: { name: "entry_id" } });

export default Entry;
