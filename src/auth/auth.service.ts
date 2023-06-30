import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {

    constructor( 
        private jwtService: JwtService,
        ) { }

    async userId(request: Request): Promise<number> {
        const cookie = request.cookies['jwt'];

        console.log(cookie);

        const data = await this.jwtService.verifyAsync(cookie);

        return data['id'];
    }
}
