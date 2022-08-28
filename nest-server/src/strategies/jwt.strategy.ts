import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.JWT_SALT}`,
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  //   validate(payload: JwtResponse): Promise<User> {
  //     // return this.authService.verifyPayload(payload);
  //   }
}
