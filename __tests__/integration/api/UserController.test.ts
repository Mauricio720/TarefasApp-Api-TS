import { UserRepository } from "domain/repository/UserRepository"
import axios from "axios";
import dotenv from 'dotenv'
import { UserRepositoryMongoDB } from "infra/database/repository/UserRepositoryMongoDB";
import { deleteData } from "infra/database/scripts/deleteData";

dotenv.config();

describe("User Controller", () => {
  let userRepository:UserRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryMongoDB()
  })

  test("should create user", async () => {
    const inputCreateUser={
      name: 'any name',
      thumbnail:'any',
      email: 'any@any.com',
      login: 'any',
      password:'1234'
    }
    
    const response = await axios.post(`http://localhost:${process.env.PORT}/users`, inputCreateUser)    
    expect(response.status).toBe(200);
    expect(response.data.id).toBeDefined()
  })

  test("should authenticate user", async () => {
    const inputCreateUser={
      name: 'any name',
      thumbnail:'any',
      email: 'any@any.com',
      login: 'any',
      password:'1234'
    }
    
   await axios.post(`http://localhost:${process.env.PORT}/users`, inputCreateUser)    
    
   const responseAuth = await axios.post(`http://localhost:${process.env.PORT}/users/auth`, {
      email: inputCreateUser.email,
      password: inputCreateUser.password
    })
    
    expect(responseAuth.status).toBe(200);
    expect(responseAuth.data.token).toBeDefined()
    expect(responseAuth.data.user.email).toBe(inputCreateUser.email)
  })

  afterEach(() => {
    userRepository = new UserRepositoryMongoDB()
  })

  afterAll(() => {
    deleteData()
  })
    
})