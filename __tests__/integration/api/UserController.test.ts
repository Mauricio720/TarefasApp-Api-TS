import { UserRepository } from "application/repository/UserRepository"
import axios from "axios";
import { UserRepositoryMemory } from "infra/repository/memory/UserRepositoryMemory";
import dotenv from 'dotenv'

dotenv.config();

describe("User Controller", () => {
  let userRepository:UserRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryMemory()
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
    console.log(responseAuth.data);
    
    expect(responseAuth.status).toBe(200);
    expect(responseAuth.data.token).toBeDefined()
    expect(responseAuth.data.user.email).toBe(inputCreateUser.email)
  })

  afterEach(() => {
    userRepository = new UserRepositoryMemory()
  })
    
})