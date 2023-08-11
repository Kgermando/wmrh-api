import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import type { Response } from 'express'; 

import { ApointementService } from './apointement.service';
import { ApointementCreateDto } from './models/apointement-create.dto';
import { ApointementUpdateDto } from './models/apointement-update.dto';

@UseGuards(AuthGuard)
@Controller('apointements')
export class ApointementController {
    constructor(
        private apointementService: ApointementService
    ) {}

    @Get('get-pie/:code_entreprise/:matricule')
    async getPie(
        @Param('code_entreprise') code_entreprise: string,
        @Param('matricule') matricule: string
    ) {
        return this.apointementService.getPie(code_entreprise, matricule);
    }

    @Get('get-pie-year/:code_entreprise/:matricule')
    async getPieYEAR(
        @Param('code_entreprise') code_entreprise: string,
        @Param('matricule') matricule: string
    ) {
        return this.apointementService.getPieYEAR(code_entreprise, matricule);
    }

    @Get('get-pie-all/:code_entreprise/:matricule')
    async getPieAll(
        @Param('code_entreprise') code_entreprise: string,
        @Param('matricule') matricule: string
    ) {
        return this.apointementService.getPieAll(code_entreprise, matricule);
    }

    @Get('get-matricule/:code_entreprise/:matricule')
    async getMatricule(
      @Param('code_entreprise') code_entreprise: string,
      @Param('matricule') matricule: string,
    ) {
      return this.apointementService.getMatricule(code_entreprise, matricule);
    }

    @Get('get-registre/:code_entreprise')
    async getRegisterPresence(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.apointementService.registrePresence(code_entreprise);
    } 

    @Get('get-last-item/:code_entreprise/:matricule')
    async getLastItem(
      @Param('code_entreprise') code_entreprise: string,
      @Param('matricule') matricule: string,
    ) {
      return this.apointementService.getLastItem(code_entreprise, matricule);
    }

    @Get('get-item-p-a-aa/:code_entreprise')
    async getItemsPAAA(
      @Param('code_entreprise') code_entreprise: string
    ) {
      return this.apointementService.getItemsPAAA(code_entreprise);
    }

    @Get('get-item-conge/:code_entreprise')
    async getItemsCongE(
      @Param('code_entreprise') code_entreprise: string
    ) {
      return this.apointementService.getItemsCongE(code_entreprise);
    }


    @Post('download-xlsx/:code_entreprise/:site_location/:start_date/:end_date')
    async downloadReport(
      @Res() res: Response,
      @Param('code_entreprise') code_entreprise: string,
      @Param('site_location') site_location: string,
      @Param('start_date') start_date: Date,
      @Param('end_date') end_date: Date
      ) {
        let result = await this.apointementService.downloadExcel(code_entreprise, site_location, start_date, end_date);
          res.set("Content-Type", "text/xlsx");
        res.download(`${result}`);
      }






    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.apointementService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.apointementService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: ApointementCreateDto
    ) {
        return this.apointementService.create(body);
    }

    // @Get('get/:matricule')
    // async get(@Param('matricule') matricule: string) {
    //     return this.apointementService.findOne({where: {matricule}});
    // }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.apointementService.findGetOne({id});
    }
 
    
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: ApointementUpdateDto
    ) {
      const update_created = new Date();
        await this.apointementService.update(id, {...body, update_created}); 
        return this.apointementService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.apointementService.delete(id);
    }
}
