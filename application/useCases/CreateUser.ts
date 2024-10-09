import { User } from "domain/entities/User";
import { UserRepository } from "domain/repository/UserRepository";

export class CreateUser{
  constructor(private readonly userRepository : UserRepository){}
  async execute(input: InputCreateUser){
    const user = User.create({
      name: input.name,
      email: input.email,
      password: input.password ?? '',
      thumbnail: input.thumbnail || undefined
    });
    await this.userRepository.save(user);
    return user.getId();
  }
}

export type InputCreateUser={
  name: string;
  email: string;
  password?: string;
  thumbnail?: string;
}



