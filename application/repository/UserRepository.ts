import { User } from "domain/entities/User";
export interface UserRepository{
  findById(id:string):Promise<User>
  save(user:User):Promise<void>
}

export interface CreateUserRepository extends Pick<UserRepository, 'save'>{}
export interface FindUserRepository extends Pick<UserRepository, 'findById'>{}