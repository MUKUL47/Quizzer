import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CryptoService, UsersService } from 'src/services';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private cryptoService: CryptoService,
    private userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const headers = request.headers;
      const token = headers['authorization']?.replace('Bearer ', '');
      if (!token) throw new UnauthorizedException('Invalid Token');
      const { user } = this.cryptoService.verify(token);
      request['user'] = await this.userService.getById(user);
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
