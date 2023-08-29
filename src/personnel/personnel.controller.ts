import { BadRequestException, Body, ClassSerializerInterceptor, 
    Controller, Delete, Get, Param, Post, Put, Query, Req, 
    UploadedFile, UseGuards, UseInterceptors, Header, Res, StreamableFile } from '@nestjs/common';
import * as bcrypt from 'bcrypt';  
import * as Papa from 'papaparse';
import { AuthGuard } from 'src/auth/auth.guard'; 
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express'; 
import { PersonnelService } from './personnel.service';
import { Personnel } from './models/personnel.entity';
import { PersonnelCreateDto } from './models/personnel-create.dto';
import { PersonnelUpdateDto } from './models/personnel-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express'; 

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

  @Get('get-all/:code_entreprise/:site_locations')
  async getAllLocation(
    @Param('code_entreprise') code_entreprise: string,
    @Param('site_locations') site_locations: string,
  ) {
    return this.personneService.allGetLocation(code_entreprise, site_locations);
  }


  @Get(':code_entreprise')
  async all(
      @Query('page') page = 1,
      @Param('code_entreprise') code_entreprise: string,
    ) {
    return this.personneService.paginate(page, code_entreprise);
  }

  @Get('get-syndicat/:code_entreprise')
  async getSyndicat(
    @Param('code_entreprise') code_entreprise: string
  ) {
    return this.personneService.getSyndicat(code_entreprise);
  }


  @Post()
  async create(@Body() body: PersonnelCreateDto): Promise<Personnel> {
    const password = await bcrypt.hash('1234', 12); 
    return this.personneService.create({ 
      ...body, 
      password
    });
  }

  @Post('upload-csv')
  @UseInterceptors(FileInterceptor('file'))
  importEnergyConsuption(@UploadedFile() file) {
    try {
      let csv = file.buffer.toString();
      if (csv.charCodeAt(0) === 0xFEFF) {
        csv = csv.slice(1);
      }
      const entries = Papa.parse(csv, { header: true, delimiter: ';', dynamicTyping: true });
      entries.data.forEach(async element => {
        const password = await bcrypt.hash('1234', 12);
        const created = new Date();
        const update_created = new Date();
        console.log("data csv", element);
          return this.personneService.create({
            ...element, 
            password,
            created,
            update_created
          });
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  @Post('download-xlsx/:code_entreprise/:start_date/:end_date') 
  async downloadReport(
    @Res() res: Response,
    @Param('code_entreprise') code_entreprise: string,
    @Param('start_date') start_date: Date,
    @Param('end_date') end_date: Date
    ) {
      let result = await this.personneService.downloadExcel(code_entreprise, start_date, end_date);
        // console.log("result", result);  
        res.set("Content-Type", "text/xlsx");
      res.download(`${result}`);
  } 

  @Post('download-model-xlsx') 
  async downloadModelReport(
    @Res() res: Response,
    ) {
      let result = await this.personneService.downloadModelExcel();
        // console.log("result", result);  
        res.set("Content-Type", "text/xlsx");
      res.download(`${result}`);
  } 


  @Get('get/:id')
  async get(@Param('id') id: number) {
    return this.personneService.findGetOne({id});
  }

  @Get('get-matricule/:matricule')
  async getMatricule(@Param('matricule') matricule: string) {
    return this.personneService.findGetOne({matricule});
  }
  

  // @Get('presence/:matricule')
  // async presence(@Param('matricule') matricule: string) {
  //   return this.personneService.presence({where: {matricule}});
  // }


  // User lui meme modifie
  @Put('info')
  async updateInfo(
    @Req() request: Request,
    @Body() body: PersonnelUpdateDto ) {
    const id = await this.authService.personnelId(request);

    const update_created = new Date();
    await this.personneService.update(id, {...body, update_created});
    
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

    const update_created = new Date();
    await this.personneService.update(id, {...body, update_created});   
    return this.personneService.findOne({where: {id}});
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
      return this.personneService.delete(id);
  }
}
