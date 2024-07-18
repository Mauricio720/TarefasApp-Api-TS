import { Task } from "domain/entities/Task";
import { TaskRepository } from "domain/repository/TaskRepository";

export class TaskRepositoryMemory implements TaskRepository {
  private tasks: Task[] = []

  async findById(id: string): Promise<Task> {
    const task = this.tasks.find((t) => t.getId() === id)
    if (!task) {
      throw new Error("Task not found")
    }
    return task
  }

  async getAll(): Promise<Task[]> {
    return this.tasks
  }

  async save(task: Task): Promise<void> {
    this.tasks.push(task)
  }

  async update(task: Task): Promise<void> {
    const index = this.tasks.findIndex((t) => t.getId() === task.getId())
    if (index !== -1) {
      this.tasks[index] = task
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.tasks.findIndex((t) => t.getId() === id)
    if (index !== -1) {
      this.tasks.splice(index, 1)
    }
  }
}