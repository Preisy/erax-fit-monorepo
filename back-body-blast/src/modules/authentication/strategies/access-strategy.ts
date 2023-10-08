import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local"
import { ExtractJwt } from "passport-jwt"
import { UnauthorizedException } from "@nestjs/common";

export class AccessStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
            jwtRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretAtKey',
        })
    }

    async authUser(payload: any){
        if (!payload || !payload.sub()){
            throw new UnauthorizedException('Invalid token');
        }

        return payload;
    }
}