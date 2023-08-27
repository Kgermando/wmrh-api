import { Controller, Get, Param } from '@nestjs/common';
import { EmployesService } from './employes.service';

@Controller('dashboard-employes')
export class EmployesController {
    constructor(
        private employesService: EmployesService
    ) {}

    @Get('enmployes-sexe-month/:code_entreprise')
    async getPieSexeMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.getPieSexeMonth(code_entreprise);
    }

    @Get('enmployes-sexe-year/:code_entreprise')
    async getPieSexeYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.getPieSexeYear(code_entreprise);
    }

    @Get('enmployes-sexe-all/:code_entreprise')
    async getPieSexeAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.getPieSexeAll(code_entreprise);
    }


    @Get('enmployes-departement-month/:code_entreprise')
    async departementMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.departementMonth(code_entreprise);
    }

    @Get('enmployes-syndicat-month/:code_entreprise')
    async syndicatMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.syndicatMonth(code_entreprise);
    }

    @Get('enmployes-site-location-month/:code_entreprise')
    async siteLocationMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.siteLocationMonth(code_entreprise);
    }

    @Get('enmployes-compte-actif-month/:code_entreprise')
    async compteActifMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.compteActifMonth(code_entreprise);
    }


    @Get('enmployes-departement-year/:code_entreprise')
    async departementYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.departementYear(code_entreprise);
    }

    @Get('enmployes-syndicat-year/:code_entreprise')
    async syndicatYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.syndicatYear(code_entreprise);
    }

    @Get('enmployes-site-location-year/:code_entreprise')
    async siteLocationYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.siteLocationYear(code_entreprise);
    }

    @Get('enmployes-compte-actif-year/:code_entreprise')
    async compteActifYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.compteActifYear(code_entreprise);
    }

 

    @Get('enmployes-departement-all/:code_entreprise')
    async departementAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.departementAll(code_entreprise);
    }

    @Get('enmployes-syndicat-all/:code_entreprise')
    async syndicatAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.syndicatAll(code_entreprise);
    }

    @Get('enmployes-site-location-all/:code_entreprise')
    async siteLocationAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.siteLocationAll(code_entreprise);
    }

    @Get('enmployes-compte-actif-all/:code_entreprise')
    async compteActifAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.compteActifAll(code_entreprise);
    }


// Employés par departement

    @Get('enmployes-dep-month/:code_entreprise')
    async employeDepartementMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.employeDepartementMonth(code_entreprise);
    }


    @Get('enmployes-dep-year/:code_entreprise')
    async employeDepartementYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.employeDepartementYear(code_entreprise);
    }

    @Get('enmployes-dep-all/:code_entreprise')
    async employeDepartementAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.employeDepartementAll(code_entreprise);
    }


    // Age de contrat par employés
    @Get('enmployes-age-contrats-month/:code_entreprise')
    async ageContratEmployeMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.ageContratEmployeMonth(code_entreprise);
    }


    @Get('enmployes-age-contrats-year/:code_entreprise')
    async ageContratEmployeYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.ageContratEmployeYear(code_entreprise);
    }

    @Get('enmployes-age-contrats-all/:code_entreprise')
    async ageContratEmployeAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.employesService.ageContratEmployeAll(code_entreprise);
    }


          // Age des employés

       @Get('enmployes-age-employes-month/:code_entreprise')
       async agetEmployeMonth(
         @Param('code_entreprise') code_entreprise: string,
       ) {
         return this.employesService.agetEmployeMonth(code_entreprise);
       }
   
   
       @Get('enmployes-age-employes-year/:code_entreprise')
       async ageEmployeYear(
         @Param('code_entreprise') code_entreprise: string,
       ) {
         return this.employesService.ageEmployeYear(code_entreprise);
       }
   
       @Get('enmployes-age-employes-all/:code_entreprise')
       async ageEmployeAll(
         @Param('code_entreprise') code_entreprise: string,
       ) {
         return this.employesService.ageEmployeAll(code_entreprise);
       }
}
