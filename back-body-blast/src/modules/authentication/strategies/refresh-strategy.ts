import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"
import { Request } from "supertest";

export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
            jwtRequest: ExtractJwt.fromABodyField("refresh"),
            passReqToCallback: false,
            secretKey: `$(process.env-template.[JWT-SECRET])`,
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