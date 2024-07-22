import { CreateTask } from 'application/useCases/CreateTask';
import { Request,Response } from 'express';
import { TaskDaoMongoDB } from 'infra/database/dao/TaskDaoMongoDb';
import MongoDBAdapter from 'infra/database/MongoDB';
import { TaskRepositoryMongoDB } from 'infra/database/repository/TaskRepositoryMongoDB';

let mongoDBAdapter = new MongoDBAdapter();
const taskRepository = new TaskRepositoryMongoDB(mongoDBAdapter);
const taskDao=new TaskDaoMongoDB(mongoDBAdapter)

export class TaskController{
  static async getAll(_, res:Response){
    try{
      const tasks = await taskDao.getAll("any userId")
      res.status(200).json(tasks)
    }catch(error){
      console.log(error)
      throw error
    }
  }
  static async create(req:Request, res:Response){
    try{            
      const createTask=new CreateTask(taskRepository)
      const id=await createTask.execute({
        title: req.body.title,
        start:req.body.start,
        end:req.body.end,
        date:req.body.date,
        important:req.body.important,
        description:req.body.description,
        icon:req.body.icon,
        userId:"any userId"
      })
      
      res.status(200).json({id})
    }catch(error){
      console.log(error)
      throw error
    }
  }

}