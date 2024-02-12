import bcrypt from "bcrypt";

export interface EncryptAdapter {
  encrypt(password: string): string;
  check(password: string, passwordEncrypt: string): boolean;
}

export class EncryptBcrypt implements EncryptAdapter {
  private sizeEncrypt?: number;
  constructor(sizeEncrypt?: number) {
      this.sizeEncrypt = sizeEncrypt || 10;
  }
  encrypt(password: string): string {
      return bcrypt.hashSync(password, this.sizeEncrypt);;
  }

  check(password: string, passwordEncrypt: string): boolean {
      return bcrypt.compareSync(password, passwordEncrypt);
  }
}

export class Password {
  private password: string;

  constructor(private encryptAdapter: EncryptAdapter, password: string) {
    if(!password) throw new Error("Password is required");
    this.excryptPassword(password);
  }

  private excryptPassword(password: string): void {
      this.password = this.encryptAdapter.encrypt(password);
  }

  validatePassword(password: string, passwordEncrypt: string): boolean {
      return this.encryptAdapter.check(password, passwordEncrypt);
  }
}

