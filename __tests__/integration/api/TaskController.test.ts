import axios from "axios";
import { TaskRepository } from "domain/repository/TaskRepository";
import dotenv from 'dotenv'
import MongoDBAdapter from "infra/database/MongoDB";
import { TaskRepositoryMongoDB } from "infra/database/repository/TaskRepositoryMongoDB";
import { deleteData } from "infra/database/scripts/deleteData";

dotenv.config();

describe("Task Controller", () => {
  let taskRepository:TaskRepository;
  let mongoDBAdapter = new MongoDBAdapter("test");
  beforeAll(async () => {
    await mongoDBAdapter.connect();
  })
  beforeEach(() => {
    taskRepository = new TaskRepositoryMongoDB(mongoDBAdapter)
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

  afterEach(async () => {
    await deleteData(mongoDBAdapter)
  })

  afterAll(async () => {
    await mongoDBAdapter.disconnect()
  })
})