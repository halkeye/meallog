import {
  Model,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import config from "../config";
import Entry from "./Entry";

class EntryImage extends Model<
  InferAttributes<EntryImage>,
  InferCreationAttributes<EntryImage>
> {
  declare id: CreationOptional<number>;

  declare entryId: ForeignKey<Entry["id"]>;
  declare image: string;
}

EntryImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entryId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize: config.db,
    underscored: true,
    defaultScope: {
      attributes: {
        exclude: ["id", "createdAt", "updatedAt", "entryId", "entry_id"],
      },
    },
  },
);

export default EntryImage;
