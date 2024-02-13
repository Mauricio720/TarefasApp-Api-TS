import { CreateUserRepository } from "application/repository/UserRepository";
import { User } from "domain/entities/User";

export class CreateUser{
  
  constructor(private readonly userRepository : CreateUserRepository){}
  async execute(input: InputCreateUser){
    const user = User.create({
      name: input.name,
      email: input.email,
      login: input.login,
      password: input.password,
      thumbnail: input.thumbnail || undefined
    });

    await this.userRepository.save(user);

    return user.getId();
  }
}

export type InputCreateUser={
  name: string;
  email: string;
  login: string;
  password: string;
  thumbnail?: string;
}



