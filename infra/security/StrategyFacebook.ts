import * as dotenv from "dotenv";
import passport from "passport";
import jwt from "jsonwebtoken";
import { UserRepository } from "domain/repository/UserRepository";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { CreateUser } from "application/useCases/CreateUser";
import { AuthenticateGenerateToken } from "application/security/Authenticator";

export class StrategyFacebook {
  constructor(private readonly userRepository: UserRepository, private readonly authenticator: AuthenticateGenerateToken) {}

  async execute(req: any, res: any) {
    dotenv.config();

    const options = {
      clientID: process.env.FACEBOOK_APP_ID || "",
      clientSecret: process.env.FACEBOOK_APP_SECRET || "",
      callbackURL: "https://2486-2804-7f0-b900-8493-a975-4325-f992-8925.ngrok-free.app/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'email', 'picture.type(large)'] // Pegando os campos desejados do Facebook
    };

    return new Promise((resolve, reject) => {
      passport.use(
        new FacebookStrategy(options, async (accessToken, refreshToken, profile, done) => {
          try {
            let user = await this.userRepository.findByEmail(profile._json.email);
            if (!user) {
              const createUser = new CreateUser(this.userRepository);
              const id = await createUser.execute({
                name: profile.displayName,
                email: profile._json.email,
                thumbnail: profile.photos ? profile.photos[0].value : null,
                password: profile.id // Usando o ID do Facebook como token/senha
              });

              user = await this.userRepository.findById(id);
            }

            const token = this.authenticator.generateToken({ id: user.getId(), email: user.getEmail() });
            console.log({ token, user });
            
            resolve({ token, user });
          } catch (error) {
            reject(error);
          }
        })
      );
      passport.authenticate('facebook', { session: false })(req, res);
    });
  }
}
