import { AuthenticateUser } from 'application/security/AuthenticateUser';
import { CreateUser } from 'application/useCases/CreateUser';
import { Request,Response } from 'express';
import { UserRepositoryMemory } from 'infra/repository/memory/UserRepositoryMemory';
import { BcryptEncrypt } from 'infra/security/BcryptEncrypt';
import { JWTAuthenticator } from 'infra/security/JWTAuthenticator';

const userRepository=new UserRepositoryMemory()
const encrypt=new BcryptEncrypt();
const authenticator = new JWTAuthenticator();

export class UserController{
  static async create(req:Request, res:Response){
    const createUser=new CreateUser(userRepository);
    const id=await createUser.execute({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    res.status(200).json({id})
  }

  static async authenticate(req:Request, res:Response){
    const authenticateUser = new AuthenticateUser(userRepository,encrypt,authenticator);
    const {token,user}=await authenticateUser.execute({
      email: req.body.email,
      password: req.body.password
    })
    res.status(200).json({token,user})
  }
}