import {  TaskDao, TaskModel } from 'application/dao/TaskDao';
import { TaskCollection } from 'infra/database/collections/TaskCollection';
import { DatabaseConnectionNoSQL } from '../DatabaseConnectionNoSQL';
export class TaskDaoMongoDB implements TaskDao{
  private collection;
  constructor(private dbAdapter: DatabaseConnectionNoSQL) {
    this.collection = dbAdapter.getDb().collection<TaskCollection>("tasks")
  }
  async getAll(userId:string):Promise<TaskModel[]>{
    return this.collection.find({userId}).toArray()
  }
  async getById(id:string, userId:string):Promise<TaskModel>{
    return this.collection.findOne({id,userId})
  }
}