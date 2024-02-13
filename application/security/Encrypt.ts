export interface Encrypt {
  encrypt(password: string): string;
  check(password: string, passwordEncrypt: string): boolean;
}

export interface EncryptPassword extends Pick<Encrypt, 'encrypt'>{}
export interface CheckPassword extends Pick<Encrypt, 'check'>{}