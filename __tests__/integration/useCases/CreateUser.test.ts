import { CreateUser } from "application/useCases/CreateUser";
import { UserRepository } from "domain/repository/UserRepository";
import { UserRepositoryMongoDB } from "infra/database/repository/UserRepositoryMongoDB";
import { deleteData } from "infra/database/scripts/deleteData";

describe("Create User", () => {
  let userRepository:UserRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryMongoDB()
  })
  
  test("should create user", async () => {
    const inputCreateUser={
      name: 'any name',
      thumbnail:'any',
      email: 'any@any.com',
      password:'1234'
    }
    const createUser=new CreateUser(userRepository)
    const id=await createUser.execute(inputCreateUser)
    
    const user = await userRepository.findById(id)
    expect(user.getId()).toBe(id)
  })

  afterAll(() => {
    deleteData()
  })
})