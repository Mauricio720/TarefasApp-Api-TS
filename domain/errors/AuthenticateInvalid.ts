export class AuthenticateInvalid extends Error {
  constructor() {
    super("Usuário ou senha incorreta!");
    this.name = "AuthenticateInvalid";
  }
}