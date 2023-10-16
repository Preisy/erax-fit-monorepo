import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ExtractJwt } from "passport-jwt";
import { UnauthorizedException } from "@nestjs/common";
import { ExternalPayloadType } from "../types/external-payload.type";

export class AccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env["JWT_SECRET"],
    });
  }

  async authUser(payload: ExternalPayloadType) {
    if (!payload || !payload.userEmail) {
      throw new UnauthorizedException('Invalid token');
    }

    return payload;
  }
}
