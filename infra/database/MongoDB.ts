import { MongoClient, ServerApiVersion, Db } from "mongodb";
import "dotenv/config";
import { DatabaseConnectionNoSQL } from "./DatabaseConnectionNoSQL";


class MongoDBAdapter implements DatabaseConnectionNoSQL {
  private client: MongoClient;
  private db: Db;

  constructor(environment: "test" | "production" = 'production') {
    const uri = environment === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
    const dbName = environment === 'test' ? process.env.TEST_DATABASE_NAME : process.env.DATABASE_NAME;

    if (!uri || !dbName) {
      throw new Error(`Please define the ${environment === 'test' ? 'TEST_' : ''}MONGODB_URI and ${environment === 'test' ? 'TEST_' : ''}DATABASE_NAME environment variables inside .env`);
    }

    this.client = new MongoClient(uri, {
      serverApi: ServerApiVersion.v1,
    });

    this.db = this.client.db(dbName);
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log("📖 MongoDB connected");
    } catch (err) {
      console.error("MongoDB connection failed", err);
    }
  }

  getDb(): Db {
    return this.db;
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }
}

export default MongoDBAdapter;