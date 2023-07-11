import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';  
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
    private readonly config: ConfigService) {}

  private jwtToken = this.config.get<string>('JWT_TOKEN');


  canActivate(
    context: ExecutionContext,
  ){
    const request = context.switchToHttp().getRequest();
    try {
      const jwt = request.cookies['jwt'];
      return this.jwtService.verify(jwt);
    } catch(e) {
      return false;
    } 
    
  }
}
 