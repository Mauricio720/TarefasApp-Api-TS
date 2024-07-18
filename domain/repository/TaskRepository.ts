import { Task } from "domain/entities/Task"

export interface TaskRepository{
  findById(id:string):Promise<Task>
  update(task:Task):Promise<void>
  save(task:Task):Promise<void>
  delete(id:string):Promise<void>
}