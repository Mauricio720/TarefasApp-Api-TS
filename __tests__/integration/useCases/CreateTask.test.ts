import { TaskRepositoryMongoDB } from 'infra/database/repository/TaskRepositoryMongoDB';
import { TaskRepository } from './../../../domain/repository/TaskRepository';
import { CreateTask, InputCreateTask } from 'application/useCases/CreateTask';
import { CreateUser } from 'application/useCases/CreateUser';
import { UserRepositoryMongoDB } from 'infra/database/repository/UserRepositoryMongoDB';
import { deleteData } from "infra/database/scripts/deleteData";
import { connection } from 'infra/database/MongoDB';

describe("Create Task", () => {
  let taskRepository:TaskRepository;
  beforeEach(() => {
    taskRepository = new TaskRepositoryMongoDB()
  })

  test("should create task", async () => {
    const inputCreateUser={
      name: 'any name',
      thumbnail:'any',
      email: 'any@any.com',
      password:'1234'
    }
    const userRepository=new UserRepositoryMongoDB()
    const createUser=new CreateUser(userRepository)
    const idUser=await createUser.execute(inputCreateUser)

    const inputCreateTask:InputCreateTask={
      title: 'any title',
      start: 'any start',
      end: 'any end',
      date: 'any date',
      important:'important',
      description: 'any description',
      icon: 'any icon',
      userId: idUser
    }
    const createTask=new CreateTask(taskRepository)
    const id=await createTask.execute(inputCreateTask)
    
    const task = await taskRepository.findById(id)
    expect(task.getId()).toBe(id)
  })

  afterAll(async () => {
    await deleteData()
  })
})