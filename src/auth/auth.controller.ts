import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express'; 
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private authService: AuthService,
        ) { }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        if(body.password !== body.password_confirm) {
            throw new BadRequestException("Mot de passe de correspond pas.");
        }
        const hashed = await bcrypt.hash(body.password, 12);

        return this.userService.create({
            photo: body.photo,
            nom: body.nom,
            postnom: body.postnom,
            prenom: body.prenom,
            email: body.email,
            telephone: body.telephone,
            adresse: body.adresse,
            sexe: body.sexe,
            date_naissance: body.date_naissance,
            lieu_naissance: body.lieu_naissance,
            nationalite: body.nationalite,
            etat_civile: body.etat_civile,
            nbr_enfant: body.nbr_enfant,
            nbr_dependants: body.nbr_dependants,
            nbr_dependants_max: body.nbr_dependants_max,
            matricule: body.matricule,
            numero_cnss: body.numero_cnss,
            role: body.role,
            category: body.category,
            departement: body.departement,
            title: body.title,
            fonction: body.fonction,
            services: body.services,
            site_location: body.site_location,
            type_contrat: body.type_contrat,
            date_debut_contrat: body.date_debut_contrat,
            date_fin_contrat: body.date_fin_contrat,
            salaire: body.salaire,
            compte_bancaire: body.compte_bancaire,
            nom_banque: body.nom_banque,
            frais_bancaire: body.frais_bancaire,
            statut_personnel: body.statut_personnel,
            cv_url: body.cv_url,
            signature: body.signature,
            created: body.created,
            update_created: body.update_created,
            password: hashed,
            statut_presence: body.statut_presence,
            syndicat: body.syndicat,
            entreprise: body.entreprise,
            code_entreprise: body.code_entreprise,
        }
        );
    }

    @Post('login/:code_entreprise')
    async login(
        @Body('matricule') matricule: string,
        @Body('password') password: string,
        @Param('code_entreprise') code_entreprise: string,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.userService.findOne({where: {matricule} && {code_entreprise}}); 

        if(!user) {
            throw new NotFoundException('Utilisateur non trouvé!');
        } 

        if(!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('Invalid credentiels.');
        }

        if(user.statut_personnel == false) {
            throw new BadRequestException("Ce compte n'est pas actif! ");
        } 

        const jwt = await this.jwtService.signAsync({id: user.id});
        
        response.cookie('jwt', jwt, {
            httpOnly: true,
            // sameSite: "none",
            // secure: true,
          });

        return user;  
    }


    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request) {
        const id = await this.authService.userId(request);
        return this.userService.findOne({where: {id}});
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
