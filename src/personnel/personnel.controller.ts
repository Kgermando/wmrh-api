import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import * as bcrypt from 'bcrypt';  
import { AuthGuard } from 'src/auth/auth.guard'; 
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express'; 
import { PersonnelService } from './personnel.service';
import { Personnel } from './models/personnel.entity';
import { PersonnelCreateDto } from './models/personnel-create.dto';
import { PersonnelUpdateDto } from './models/personnel-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('personnels')
export class PersonnelController {

  constructor(
    private personneService: PersonnelService,
    private authService: AuthService,
  ) {}
  
    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.personneService.allGet(code_entreprise);
    }


    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.personneService.paginate(page, code_entreprise);
    }

    @Post()
    async create(@Body() body: PersonnelCreateDto): Promise<Personnel> {
      const password = await bcrypt.hash('1234', 12); 
      return this.personneService.create({ 
        ...body, 
        password, 
      });
  }

  @Get('get/:id')
  async get(@Param('id') id: number) {
    return this.personneService.findGetOne({id});
  }

  @Get('presence/:matricule')
  async presence(@Param('matricule') matricule: string) {
    return this.personneService.presence({where: {matricule}});
  }


  // User lui meme modifie
  @Put('info')
  async updateInfo(
    @Req() request: Request,
    @Body() body: PersonnelUpdateDto ) {
    const id = await this.authService.personnelId(request);

    await this.personneService.update(id, body); 
    
    return this.personneService.findOne({where: {id}});
  }


  @Put('password')  
  async updatePassword(
    @Req() request: Request, 
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    if(password !== password_confirm) {
      throw new BadRequestException("Mot de passe de correspond pas.");
  }
    const id = await this.authService.personnelId(request);

    const hashed = await bcrypt.hash(password, 12);

    await this.personneService.update(id, {
      password: hashed
    });
    
    return this.personneService.findOne({where: {id}});
  }


    // Modification des infos user par l'admin
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: PersonnelUpdateDto
  ) { 

    await this.personneService.update(id, {
      ...body, 
    }); 
    return this.personneService.findOne({where: {id}});
  }

  @Delete(':id')
  async delete(
    @Param(':id') id: number
  ) {
    return this.personneService.delete(id);
  }
}
