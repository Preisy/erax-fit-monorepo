import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { AuthRequest } from "../dto/auth.dto";
import { Strategy } from "passport-local"
import { UnauthorizedException } from "@nestjs/common";

export class AuthStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super();
    }

    async authUser(request: AuthRequest){
        const user = await this.authService.auth(request);
        
        if(!user){
            throw new UnauthorizedException;
        }
        return user;
    }
}