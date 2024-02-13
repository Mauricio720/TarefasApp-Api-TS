export interface Encrypt {
  encrypt(password: string): string;
  check(password: string, passwordEncrypt: string): boolean;
}