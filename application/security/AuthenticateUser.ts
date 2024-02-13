import { AuthenticateUserRepository } from "application/repository/UserRepository";
import { CheckPassword } from "./Encrypt";
import { AuthenticateInvalid } from "domain/errors/AuthenticateInvalid";
import { AuthenticateGenerateToken } from "./Authenticator";

export class AuthenticateUser{
  constructor(
    private readonly userRepository:AuthenticateUserRepository,
    private readonly encrypt:CheckPassword,
    private readonly authenticator:AuthenticateGenerateToken
  ){}

  async execute(input:InputAuthenticateUser):Promise<OutputAuthenticateUser>{
    const user = await this.userRepository.findByEmail(input.email)
    if(!user){
      throw new AuthenticateInvalid()
    }
    const isValidPassword = this.encrypt.check(input.password,user.getEncryptedPassword())
    if(!isValidPassword){
      throw new AuthenticateInvalid()  
    }
    const token = this.authenticator.generateToken({
      id: user.getId(),
      email: user.getEmail()
    })
    
    return {
      token,
      user:{
        id: user.getId(),
        email: user.getEmail()
      }
    }
  }
}

export type InputAuthenticateUser={
  email: string;
  password: string;
}

export type OutputAuthenticateUser={
  token: string;
  user:{
    id: string;
    email: string
  }
}