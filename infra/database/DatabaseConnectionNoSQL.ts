import { Db } from "mongodb";

export interface DatabaseConnectionNoSQL {
  connect(): Promise<void>;
  getDb(): Db;
  disconnect(): Promise<void>;
}