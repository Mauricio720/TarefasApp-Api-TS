import { Email } from 'domain/valueObject/Email';
import { Id } from 'domain/valueObject/Identifier';
import { Password } from 'domain/valueObject/Password';
import { BcryptEncrypt } from 'infra/security/BcryptEncrypt';
import { IdentifierUUID } from 'infra/security/IdentifierUUID';

export namespace User{
  export type Props={
    id?: Id;
    name: string;
    email: Email;
    password: Password;
    thumbnail?: string,
    createdAt?: Date
    updatedAt?: Date
  }

  export type CreateUserProps = {
    name: string;
    email: string;
    password: string;
    thumbnail?: string,
  }
}
export class User{
  private id: Id;
  private name: string;
  private email: Email;
  private password: Password;
  private thumbnail?: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    props: User.Props
  ){
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.thumbnail = props.thumbnail
    this.password = props.password;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt
  }

  static create(
    props: User.CreateUserProps
  ){
    return new User({
      id: new Id(new IdentifierUUID()),
      name: props.name,
      email: new Email(props.email),
      password: new Password(props.password,new BcryptEncrypt()),
      thumbnail: props.thumbnail,
      createdAt: new Date(),
    })
  }

  getId(): string {    
    return this.id.getId()
  }
  getName(): string {
    const nameArray=this.name.split(' ');
    let formatedName = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
    if(nameArray.length > 1){
      formatedName = nameArray[0].charAt(0).toUpperCase() + nameArray[0].slice(1).toLowerCase() + ' ' + nameArray[1].charAt(0).toUpperCase() + nameArray[1].slice(1).toLowerCase();
    }

    return formatedName
  }

  getEmail(): string {
    return this.email.getValue()
  }

  getThumbnail(): string {
    return this.thumbnail
  }

  getEncryptedPassword(): string {
    return this.password.getValue()
  }

  getCreatedAt(): Date {
    return this.createdAt
  }

  getUpdatedAt(): Date {
    return this.updatedAt
  }
  
}