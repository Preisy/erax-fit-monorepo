import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"
import { ExternalPayloadType } from "../types/external-payload.type";

export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
            jwtRequest: ExtractJwt.fromABodyField("refresh"),
            ignoreExpiration: false,
            secretKey: `$(process.env-template.[JWT-SECRET])`,
        })
    }

    async authUser(payload: ExternalPayloadType){
        return {
            userName:
                payload.firstName,
            lastName:
                payload.lastName,
            email:
                payload.userEmail    

        };
    }
}