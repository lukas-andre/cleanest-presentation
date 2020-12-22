import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwtPayload.inteface';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const calledController = context.getClass().name;
    const calledAction = context.getHandler().name;

    this.logger.log('calledAction: ' + calledAction);
    this.logger.log('calledController: ' + calledController);

    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (!jwt) {
      return false;
    }

    let verifyJwt: JwtPayload;
    try {
      verifyJwt = this.jwtService.verify(jwt);
    } catch (error) {
      this.logger.error('Error: ' + JSON.stringify(error));
      return false;
    }
    this.logger.log('verifyJwt: ' + JSON.stringify(verifyJwt));
    if (!verifyJwt) {
      return false;
    }

    const permission = verifyJwt.permision.find(
      p => p.c == calledController || p.c == '*',
    );
    this.logger.log('permission: ' + JSON.stringify(permission));

    if (!permission) {
      return false;
    }

    return true;
  }
}
