import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Res, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { SalaireCreateDto } from './models/salaire-create.dto';
import { SalaireUpdateDto } from './models/salaire-update.dto'; 
import { SalairesService } from './salaires.service';
import type { Response } from 'express'; 


@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('salaires')
export class SalairesController {
    constructor(
        private salaireService: SalairesService
    ) {} 

    @Get('get-jrs-preste/:code_entreprise/:matricule')
    async getJrPrestE(
      @Param('code_entreprise') code_entreprise: string,
      @Param('matricule') matricule: string
    ) {
      return this.salaireService.getJrPrestE(code_entreprise, matricule);
    }

    @Get('get-jrs-conge/:code_entreprise/:matricule')
    async getJrCongePayE(
      @Param('code_entreprise') code_entreprise: string,
      @Param('matricule') matricule: string
    ) {
      return this.salaireService.getJrCongePayE(code_entreprise, matricule);
    }

    @Get('get-nbr-heures-supp/:code_entreprise/:id')
    async nbrHeureSupp(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: string
    ) {
      return this.salaireService.nbrHeureSupp(code_entreprise, id);
    }

    @Get('get-prime-total-cdf/:code_entreprise/:id')
    async primeTotalCDF(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: string
    ) {
      return this.salaireService.primeTotalCDF(code_entreprise, id);
    }
    @Get('get-prime-total-usd/:code_entreprise/:id')
    async primeTotalUSD(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: string
    ) {
      return this.salaireService.primeTotalUSD(code_entreprise, id);
    }

    @Get('get-penalite-total-cdf/:code_entreprise/:id')
    async penaliteTotalCDF(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: string
    ) {
      return this.salaireService.penaliteTotalCDF(code_entreprise, id);
    }
    @Get('get-penalite-total-usd/:code_entreprise/:id')
    async penaliteTotalUSD(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: string
    ) {
      return this.salaireService.penaliteTotalUSD(code_entreprise, id);
    }

    @Get('get-avance-salaire-total-cdf/:code_entreprise/:id')
    async avanceSalaireTotalCDF(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: string
    ) {
      return this.salaireService.avanceSalaireTotalCDF(code_entreprise, id);
    }
    @Get('get-avance-salaire-total-usd/:code_entreprise/:id')
    async avanceSalaireTotalUSD(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: string
    ) {
      return this.salaireService.avanceSalaireTotalUSD(code_entreprise, id);
    }

    @Get('get-date-debut-contrat/:code_entreprise/:id/:date_debut_contrat')
    async getAnciennete(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: string,
      @Param('date_debut_contrat') date_debut_contrat: string,
    ) {
      return this.salaireService.getAnciennete(code_entreprise, id, date_debut_contrat);
    }

    @Get('pres-entreprise-cdf/:code_entreprise/:id')
    async preEntrepriseCDF(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: string
    ) {
      return this.salaireService.preEntrepriseCDF(code_entreprise, id);
    }
    @Get('pres-entreprise-usd/:code_entreprise/:id')
    async preEntrepriseUSD(
      @Param('code_entreprise') code_entreprise: string,
      @Param('id') id: string
    ) {
      return this.salaireService.preEntrepriseUSD(code_entreprise, id);
    }


    @Get('get-net-a-payer-total/:code_entreprise')
    async netAPayerTotal(
      @Param('code_entreprise') code_entreprise: string
    ) {
      return this.salaireService.netAPayerTotal(code_entreprise);
    }

    @Get('get-ipr-total/:code_entreprise')
    async iprTotal(
      @Param('code_entreprise') code_entreprise: string
    ) {
      return this.salaireService.iprTotal(code_entreprise);
    }

    @Get('get-cnss-qpo-total/:code_entreprise')
    async cnssQPOTotal(
      @Param('code_entreprise') code_entreprise: string
    ) {
      return this.salaireService.cnssQPOTotal(code_entreprise);
    }

    @Get('get-frais-bancaire-total/:code_entreprise')
    async fraisBancaireTotal(
      @Param('code_entreprise') code_entreprise: string
    ) {
      return this.salaireService.fraisBancaireTotal(code_entreprise);
    } 

    @Get('get-releve-paie/:code_entreprise')
    async relevePaie(
      @Param('code_entreprise') code_entreprise: string, 
    ) {
      return this.salaireService.relevePaie(code_entreprise);
    }


  @Post('download-xlsx/:code_entreprise/:start_date/:end_date')
  async downloadReport(
    @Res() res: Response,
    @Param('code_entreprise') code_entreprise: string,
    @Param('start_date') start_date: Date,
    @Param('end_date') end_date: Date
    ) {
      let result = await this.salaireService.downloadExcel(code_entreprise, start_date, end_date);
        // console.log("result", result);
        res.set("Content-Type", "text/xlsx");
      res.download(`${result}`);
    }

    

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.salaireService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.salaireService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: SalaireCreateDto
    ) {
        return this.salaireService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.salaireService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: SalaireUpdateDto
    ) {
        const update_created = new Date();
        await this.salaireService.update(id, {...body, update_created}); 
        return this.salaireService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.salaireService.delete(id);
    }
}
