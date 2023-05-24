import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export class RtGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Refresh token was not sent in Authorization header to escape Hasura auth checking
    if (request.headers.refresh) {
      request.headers.authorization = request.headers.refresh;
    }
    return super.canActivate(context);
  }
}
