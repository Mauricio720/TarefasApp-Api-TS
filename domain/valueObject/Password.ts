import { EncryptPassword } from "application/security/Encrypt";

export class Password {
  private value: string;

  constructor(password: string, encrypt?: EncryptPassword) {
    if(!password) throw new Error("Password is required");
    this.value = encrypt ? encrypt.encrypt(password) : password;
  }

  getValue(): string {
    return this.value;
  }
}
