import { AuthenticateGenerateToken } from "application/security/Authenticator";
import { CheckPassword } from "application/security/Encrypt";
import { CreateUser } from 'application/useCases/CreateUser';
import { AuthenticateUser } from 'application/useCases/AuthenticateUser';
import { AuthenticateInvalid } from "domain/errors/AuthenticateInvalid";
import { UserRepository } from "domain/repository/UserRepository";
import { UserRepositoryMongoDB } from "infra/database/repository/UserRepositoryMongoDB";
import { deleteData } from "infra/database/scripts/deleteData";

describe("Auth User", () => {
  let userRepository:UserRepository;
  let encrypt:CheckPassword
  let authenticator: AuthenticateGenerateToken

  beforeEach(() => {
    userRepository = new UserRepositoryMongoDB()
    encrypt={
      check:jest.fn().mockReturnValue(true)
    }
    authenticator={
      generateToken:jest.fn().mockReturnValue('any_token')
    }
  })

  test("should authenticate user", async () => {
    const inputCreateUser={
      name: 'any name',
      thumbnail:'any',
      email: 'any@any.com',
      password:'1234'
    }
    const createUser=new CreateUser(userRepository)
    await createUser.execute({
      name: inputCreateUser.name,
      email: inputCreateUser.email,
      password: inputCreateUser.password  
    })
    const authenticate=new AuthenticateUser(userRepository,encrypt,authenticator)
    const {token,user}=await authenticate.execute({
      email: inputCreateUser.email,
      password: inputCreateUser.password
    })
    expect(token).toBeDefined()
    expect(user.email).toBe("any@any.com")
  })

  test("should throw error invalid password", async () => {
    const inputCreateUser={
      name: 'any name',
      thumbnail:'any',
      email: 'any@any.com',
      password:'1234'
    }
    const createUser=new CreateUser(userRepository)
    await createUser.execute({
      name: inputCreateUser.name,
      email: inputCreateUser.email,
      password: inputCreateUser.password  
    })

    expect(async ()=>{
      const authenticate=new AuthenticateUser(userRepository,encrypt,authenticator)
      await authenticate.execute({
        email: "wrongEmail",
        password: '1234'
      })
    }).rejects.toThrow(AuthenticateInvalid)

    encrypt={
      check:jest.fn().mockReturnValue(false)
    }
    expect(async ()=>{
      const authenticate=new AuthenticateUser(userRepository,encrypt,authenticator)
      await authenticate.execute({
        email: "any@any.com",
        password: 'wrongPassword'
      })
    }).rejects.toThrow(AuthenticateInvalid)
  })

  afterAll(async () => {
    await deleteData()
  })
})