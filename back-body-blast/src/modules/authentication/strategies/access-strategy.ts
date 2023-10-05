import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"
import { UnauthorizedException } from "@nestjs/common";

export class AccessStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
            jwtRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretKey: 'at-secret',
        })
    }

    async authUser(payload: any){
        if (!payload || !payload.sub()){
            throw new UnauthorizedException('Invalid token');
        }

        return payload;
    }
}