import { connection } from "../MongoDB";

export async function deleteData() {
  await connection.collection("users").deleteMany()
  await connection.collection("tasks").deleteMany()
}