import { AuthenticateUser } from 'application/useCases/AuthenticateUser';
import { CreateUser } from 'application/useCases/CreateUser';
import { Request,Response } from 'express';
import { UserRepositoryMongoDB } from 'infra/database/repository/UserRepositoryMongoDB';
import { BcryptEncrypt } from 'infra/security/BcryptEncrypt';
import { JWTAuthenticator } from 'infra/security/JWTAuthenticator';

const userRepository=new UserRepositoryMongoDB()
const encrypt=new BcryptEncrypt();
const authenticator = new JWTAuthenticator();

export class UserController{
  static async create(req:Request, res:Response){
    try{
      const createUser=new CreateUser(userRepository);
      const id=await createUser.execute({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })

      res.status(200).json({id})
    }catch(error){
      console.log(error)
      throw error
    }
  }

  static async authenticate(req:Request, res:Response){
    try{
      const authenticateUser = new AuthenticateUser(userRepository,encrypt,authenticator);
      const {token,user}=await authenticateUser.execute({
        email: req.body.email,
        password: req.body.password
      })
      res.status(200).json({token,user})
    }catch(error){
      console.log(error)
      throw error
    }
  }
}