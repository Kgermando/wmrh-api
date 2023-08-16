import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express'; 
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { PersonnelService } from 'src/personnel/personnel.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
    constructor(
        private personnelService: PersonnelService,
        private jwtService: JwtService,
        private authService: AuthService,
        ) { }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        if(body.password !== body.password_confirm) {
            throw new BadRequestException("Mot de passe de correspond pas.");
        }
        const hashed = await bcrypt.hash(body.password, 12);

        return this.personnelService.create({
            photo: body.photo,
            nom: body.nom,
            postnom: body.postnom,
            prenom: body.prenom,
            email: body.email,
            telephone: body.telephone,
            adresse: body.adresse,
            sexe: body.sexe, 
            matricule: body.matricule, 
            roles: body.roles,
            category: body.category, 
            signature: body.signature,
            created: body.created,
            update_created: body.update_created,
            password: hashed,
            entreprise: body.entreprise,
            code_entreprise: body.code_entreprise,
        }
        );
    }

    @Post('login')
    async login(
        @Body('matricule') matricule: string,
        @Body('password') password: string,
        @Body('code_entreprise') code_entreprise: string,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.personnelService.findOne({
            where: { matricule: matricule, code_entreprise: code_entreprise }
        })

        if(!user) {
            throw new NotFoundException('Utilisateur non trouvé!');
        }

        if(!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('Invalid credentiels.');
        }

        
        // if(user.statut_personnel == false) {
        //     throw new BadRequestException("Ce compte n'est pas actif! ");
        // } 

        const jwt = await this.jwtService.signAsync({id: user.id});
        
        response.cookie('jwt', jwt, { httpOnly: true });

        return user;
    }


    @UseGuards(AuthGuard)
    @Get('personnel')
    async user(@Req() request: Request) {
        const id = await this.authService.personnelId(request);
        return this.personnelService.findGetOne({id});
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(
        @Res() response: Response 
    ) {
        response.clearCookie('jwt');

        return {
            message: 'Success!'
        }
    }
 
}
