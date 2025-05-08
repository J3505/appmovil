import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: string;
  username: string;
  rol: string;
}

interface User {
  userId: string;
  username: string;
  rol: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: config.get('JWT_SECRET') || '',
    });
  }

  validate(payload: JwtPayload): User {
    return {
      userId: payload.sub,
      username: payload.username,
      rol: payload.rol,
    };
  }
}
