import { UserAdapter } from 'application/adapters/User.Adapter';
import { UserRepository } from 'domain/repository/UserRepository';
import { User } from 'domain/entities/User';
export class UserRepositoryMemory implements UserRepository {
  private users:User[] = [];

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.getEmail() === email)
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.getId() === id)
  }
  
  async save(userInput: User): Promise<void> {
    this.users.push(UserAdapter.create({
      id: userInput.getId(),
      name: userInput.getName(),
      thumbnail: userInput.getThumbnail(),
      email: userInput.getEmail(),
      password: userInput.getEncryptedPassword()
    }));
  }
}