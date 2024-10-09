import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import * as dotenv from "dotenv";
import passport from "passport";
import { User } from "domain/entities/User";
import { Strategy } from "application/security/Strategy";
import { UserRepository } from "domain/repository/UserRepository";

export class StrategyJwt implements Strategy {
  private authenticateUser: User;

  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    dotenv.config();

    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_TOKEN as string,
    };

    passport.use(
      new JWTStrategy(options, async (payload, done) => {
        const user = await this.userRepository.findById(payload.id);
        if (user) {
          this.authenticateUser = user;
          return done(null, user);
        }
        return done(null, false);
      })
    );

    passport.serializeUser(function (user, done) {
      done(null, user);
    });
  }

  async getAuthenticateUser(): Promise<User> {
    return this.authenticateUser;
  }
}