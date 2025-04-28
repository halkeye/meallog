import { Sequelize } from "sequelize";
import { S3Client } from "@aws-sdk/client-s3";

export interface IStorage {
}


class Config {
  private _db: Sequelize | null = null;
  private _storage: IStorage | null = null;

  public sessionKey = 'your-secret-key';

  constructor() {
    const storageURL = new URL(process.env.STORAGE_URL || 'file://./uploads');
  }

  get db(): Sequelize {
    if (!this._db) {
      this._db = new Sequelize(process.env.DB_URL || 'sqlite://db.sqlite', {
        logging: false, // Set to console.log to see SQL queries
      });
    }
    return this._db;
  }

  get storage(): IStorage {
    if (!this._storage) {
      const storageURL = new URL(process.env.STORAGE_URL || 'file://./uploads');
      if (storageURL.protocol === 's3:') {
        const s3 = new S3Client({
          region: process.env.AWS_REGION!,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
          },
        });
        this._storage = s3
      } else {
        this._storage = {
          // Implement local file storage logic here
          // For example, using fs module to save files locally
        };
      }
    }
    return this._storage;
  }
}

export default new Config();