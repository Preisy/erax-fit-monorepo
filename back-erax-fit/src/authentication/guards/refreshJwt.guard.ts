import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth.service";

@Injectable()
export class RefreshJwtGuard extends AuthGuard('jwt-refresh') {
    constructor(private authService: AuthService){
        super();
    }

}