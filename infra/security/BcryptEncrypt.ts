import { Encrypt } from "application/security/Encrypt";
import bcrypt from "bcrypt";

export class BcryptEncrypt implements Encrypt {
  encrypt(password: string,size?:number): string {
    return bcrypt.hashSync(password, size || 10);
  }
  check(password: string, passwordEncrypt: string): boolean {
    return bcrypt.compareSync(password, passwordEncrypt);
  }
}
