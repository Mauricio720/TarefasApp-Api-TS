import {  TaskDao, TaskModel } from 'application/dao/TaskDao';
import { connection } from "infra/database/MongoDB";
import { TaskCollection } from 'infra/database/collections/TaskCollection';
export class TaskDaoMongoDB implements TaskDao{
  private collection=connection.collection<TaskCollection>("tasks")

  async getAll(userId:string):Promise<TaskModel[]>{
    return this.collection.find({userId}).toArray()
  }
  async getById(id:string, userId:string):Promise<TaskModel>{
    return this.collection.findOne({id,userId})
  }
}