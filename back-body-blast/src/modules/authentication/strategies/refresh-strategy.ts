import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local"
import { ExtractJwt } from "passport-jwt"
import { Request } from "supertest";

export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
    constructor(){
        super({
            jwtRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: 'secretRtKey',
        })
    }

    async validation(req: Request, payload: any){
        const refreshToken = req.get('authorization').replace('bearer', '').trim();

        return {
            ...payload,
            refreshToken    
        };
    }
}