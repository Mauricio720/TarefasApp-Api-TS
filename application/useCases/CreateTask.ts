import { TaskRepository } from 'domain/repository/TaskRepository';
import { Task } from "domain/entities/Task";

export class CreateTask{
  constructor(private readonly taskRepository:TaskRepository){}
  async execute(input:InputCreateTask){    
    const task = Task.create({
      title: input.title,
      start: input.start,
      end: input.end,
      date: input.date,
      important: input.important,
      description: input.description,
      icon: input.icon,
      userId: input.userId
    })
    await this.taskRepository.save(task)
    return task.getId()
  }
}

export type InputCreateTask={
  title: string;
  start: string;
  end: string;
  date: string;
  important: Task.TaskImportance;
  description: string;
  icon: string;
  userId: string;
}

