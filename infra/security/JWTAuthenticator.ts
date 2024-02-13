import { Authenticator } from "application/security/Authenticator"
import jsonwebtoken from "jsonwebtoken";

export class JWTAuthenticator implements Authenticator {
  generateToken(payload: any): string {
    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN)
  }

  decoder(token: string): any {
    return jsonwebtoken.verify(token, process.env.JWT_TOKEN)
  }
}