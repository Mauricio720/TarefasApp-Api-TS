
import { User } from "domain/entities/User";
import { Id } from "domain/valueObject/Identifier";
import { connection } from "infra/database/MongoDB";
import { UserRepository } from 'domain/repository/UserRepository';
import { Email } from "domain/valueObject/Email";
import { Password } from "domain/valueObject/Password";
type UserCollection={
  id: string;
  name: string;
  email: string;
  password: string;
  thumbnail?: string,
  createdAt?: Date
  updatedAt?: Date
}
export class UserRepositoryMongoDB implements UserRepository {
  private collection=connection.collection<UserCollection>("users")

  async findById(id: string): Promise<User> {
    const response = await this.collection.findOne({ id });
    if (!response) {
      throw new Error("User not found")
    }
    return new User({
      id: new Id(null,response.id),
      name: response.name,
      email: new Email(response.email),
      password: new Password(response.password),
      thumbnail: response.thumbnail
    })
  }
  

  async findByEmail(email: string): Promise<User> {
    const response = await this.collection.findOne({ email });
    if (!response) {
      throw new Error("User not found")
    }

    return new User({
      id: new Id(null,response.id),
      name: response.name,
      email: new Email(response.email),
      password: new Password(response.password),
      thumbnail: response.thumbnail
    })
  }

  async save(user: User): Promise<void> {
    await this.collection.insertOne({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getEncryptedPassword(),
      thumbnail: user.getThumbnail()
    })
  }

  async update(user: User): Promise<void> {
    await this.collection.updateOne({ id: user.getId() }, {
      $set: {
        name: user.getName(),
        email: user.getEmail(),
        password: user.getEncryptedPassword(),
        thumbnail: user.getThumbnail()
      }
    })
  }
}