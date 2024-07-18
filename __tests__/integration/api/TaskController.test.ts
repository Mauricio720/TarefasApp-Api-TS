import axios from "axios";
import { TaskRepository } from "domain/repository/TaskRepository";
import dotenv from 'dotenv'
import { TaskRepositoryMongoDB } from "infra/database/repository/TaskRepositoryMongoDB";
import { deleteData } from "infra/database/scripts/deleteData";

dotenv.config();

describe("Task Controller", () => {
  let taskRepository:TaskRepository;

  beforeEach(() => {
    taskRepository = new TaskRepositoryMongoDB()
  })

  test("should create task", async () => {
    const inputCreateTask={
      title: 'any title',
      start: 'any start',
      end: 'any end',
      date: 'any date',
      important:'important',
      description: 'any description',
      icon: 'any icon',
      userId: 'any userId'
    }
    
    const response = await axios.post(`http://localhost:${process.env.PORT}/tasks`, inputCreateTask)    
    
    expect(response.status).toBe(200);
    expect(response.data.id).toBeDefined()
  })

  afterEach(() => {
    taskRepository = new TaskRepositoryMongoDB()
  })

  afterAll(async () => {
    await deleteData()
  })
})