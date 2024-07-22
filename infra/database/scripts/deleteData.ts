import { DatabaseConnectionNoSQL } from './../DatabaseConnectionNoSQL';

export async function deleteData(databaseConnectionNoSQL: DatabaseConnectionNoSQL) {
  await databaseConnectionNoSQL.getDb().collection("users").deleteMany()
  await databaseConnectionNoSQL.getDb().collection("tasks").deleteMany()
}