import { Task } from "domain/entities/Task";
import { TaskRepository } from "domain/repository/TaskRepository";
import { Id } from "domain/valueObject/Identifier";
import { connection } from "infra/database/MongoDB";
import { TaskCollection } from "../collections/TaskCollection";

export class TaskRepositoryMongoDB implements TaskRepository {
  private collection=connection.collection<TaskCollection>("tasks")

  async findById(id: string): Promise<Task> {
    const response = await this.collection.findOne({ id });
    if (!response) {
      throw new Error("Task not found")
    }
    return new Task({
      id: new Id(null,response.id),
      title: response.title,
      start: response.start,
      end: response.end,
      date: response.date,
      important: response.important as Task.TaskImportance,
      description: response.description,
      icon: response.icon,
      userId: response.userId
    })
  }

  async save(task: Task): Promise<void> {
    await this.collection.insertOne({
      id: task.getId(),
      title: task.getTitle(),
      start: task.getStart(),
      end: task.getEnd(),
      date: task.getDate(),
      important: task.getImportant(),
      description: task.getDescription(),
      icon: task.getIcon(),
      userId: task.getUserId()
    })
  }

  async update(task: Task): Promise<void> {
    await this.collection.updateOne({ id: task.getId() }, {
      $set: {
        title: task.getTitle(),
        start: task.getStart(),
        end: task.getEnd(),
        date: task.getDate(),
        important: task.getImportant(),
        description: task.getDescription(),
        icon: task.getIcon(),
        userId: task.getUserId()
      }
    })
  }

  async delete(id: string): Promise<void> {
    await this.collection.deleteOne({ id })
  }
}