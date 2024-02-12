import { EncryptBcrypt, Password } from 'domain/valueObject/Password';
import { Identifier, IdentifierUUID } from "domain/valueObject/Identifier";

export namespace User{
  export type Props={
    id?: Identifier
    name: string;
    email: string;
    login: string;
    password: string;
    thumbnail?: string,
    createdAt?: Date
    updatedAt?: Date
  }
}
export class User{
  readonly id: Identifier;
  private name: string;
  private email: string;
  private login: string;
  private password: string;
  private thumbnail?: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    props: User.Props
  ){
    this.name = props.name;
    this.email = props.email;
    this.login = props.login;
    this.thumbnail = props.thumbnail
  }

  static create(
    props: User.Props
  ){
    return new User({
      id: new Identifier(new IdentifierUUID()),
      name: props.name,
      email: props.email,
      login: props.login,
      password: new Password(new EncryptBcrypt(),props.password),
      thumbnail: props.thumbnail,
      createdAt: new Date(),
    })
  }
}