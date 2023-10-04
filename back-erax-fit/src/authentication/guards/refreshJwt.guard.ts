import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Observable } from "rxjs";

@Injectable()
export class RefreshJwtGuard extends AuthGuard('jwt-refresh') {
    constructor(private authService: AuthService){
        super();
    }

}