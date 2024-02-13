import { Email } from 'domain/valueObject/Email';
import { User } from "domain/entities/User";
import { Id } from "domain/valueObject/Identifier";
import { IdentifierUUID } from 'infra/security/IdentifierUUID';
import { Password } from 'domain/valueObject/Password';

export type UserAdapterInput = {
  id: string;
  name: string;
  email: string;
  login: string;
  password: string;
  thumbnail?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export class UserAdapter {
  static create(userInput: UserAdapterInput): User {
    return new User(
      {
        id: new Id(new IdentifierUUID() ,userInput.id),
        name: userInput.name,
        email: new Email(userInput.email),
        login: userInput.login,
        password: new Password(userInput.password),
        thumbnail: userInput.thumbnail,
        createdAt: userInput.createdAt,
        updatedAt: userInput.updatedAt
      }
    );
  }
}