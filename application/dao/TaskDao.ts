import { Task } from "domain/entities/Task";

export interface TaskModel{
  id: string
  title: string
  start: string
  end: string
  date: string
  important: string
  description: string
  icon: string
  userId: string
}
export interface TaskDao{
  getAll(userId:string):Promise<TaskModel[]>
  getById(id:string, userId:string):Promise<TaskModel>
}