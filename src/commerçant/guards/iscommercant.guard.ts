import { Injectable } from '@nestjs/common/decorators';
import { CanActivate, ExecutionContext } from '@nestjs/common/interfaces';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class IsCommercantGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.rawHeaders[1].split(' ')[1];
    console.log(authorization);
    if (authorization) {
      const decoded = this.jwtService.verify(authorization);

      if (!decoded.commerçant_id) {
        return false;
      }

      return true;
    }
    return false;
  }
}
