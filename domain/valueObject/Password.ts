import { Encrypt } from "application/security/Encrypt";

export class Password {
  private value: string;

  constructor(password: string, encrypt: Encrypt) {
    if(!password) throw new Error("Password is required");
    this.value = encrypt.encrypt(password);
  }

  getValue(): string {
    return this.value;
  }
}
