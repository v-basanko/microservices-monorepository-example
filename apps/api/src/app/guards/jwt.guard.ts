import { AuthGuard } from "@nestjs/passport";
import {ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('CONTEXT: ',context.switchToHttp().getRequest().headers)
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('JWT AUTH GUARD',err, user, info)
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
