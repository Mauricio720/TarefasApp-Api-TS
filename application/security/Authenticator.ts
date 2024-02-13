export interface Authenticator {
  generateToken: (payload: any) => string
  decoder: (token: string) => any
}

export interface AuthenticateGenerateToken extends Pick<Authenticator, 'generateToken'> {}