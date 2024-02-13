import { User } from "domain/entities/User";
export interface UserRepository{
  findById(id:string):Promise<User>
  findByEmail(email:string):Promise<User>
  save(user:User):Promise<void>
}

export interface CreateUserRepository extends Pick<UserRepository, 'save'>{}
export interface FindByIdUserRepository extends Pick<UserRepository, 'findById'>{}
export interface FindUserByEmailUserRepository extends Pick<UserRepository, 'findByEmail'>{}
export interface AuthenticateUserRepository extends Pick<UserRepository, 'findByEmail' | 'save'>{}