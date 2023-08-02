import { Controller, Get, Param } from '@nestjs/common';
import DashAllService from './dash-all.service';

@Controller('dash-all')
export class DashAllController {
    constructor(
        private dashAllService: DashAllService
    ) {}

    @Get('total-enmployes-month/:code_entreprise')
    async totalEnmployesMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.totalEnmployesMonth(code_entreprise);
    }

    @Get('total-enmployes-year/:code_entreprise')
    async totalEnmployesYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.totalEnmployesYear(code_entreprise);
    }

    @Get('total-enmployes-all/:code_entreprise')
    async totalEnmployesAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.totalEnmployesAll(code_entreprise);
    }

    @Get('total-enmployes-femme-month/:code_entreprise')
    async totalEnmployeFemmeMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.totalEnmployeFemmeMonth(code_entreprise);
    }

    @Get('total-enmployes-femme-year/:code_entreprise')
    async totalEnmployeFemmeYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.totalEnmployeFemmeYear(code_entreprise);
    }

    @Get('total-enmployes-femme-all/:code_entreprise')
    async totalEnmployeFemmeAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.totalEnmployeFemmeAll(code_entreprise);
    }

    @Get('total-enmployes-homme-month/:code_entreprise')
    async totalEnmployeHommeMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.totalEnmployeHommeMonth(code_entreprise);
    }

    @Get('total-enmployes-homme-year/:code_entreprise')
    async totalEnmployeHommeYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.totalEnmployeHommeYear(code_entreprise);
    }

    @Get('total-enmployes-homme-all/:code_entreprise')
    async totalEnmployeHommeAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.totalEnmployeHommeAll(code_entreprise);
    }



    // Performences Employés
    @Get('performences-month/:code_entreprise')
    async getPerformencesMonth(
        @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.getPerformencesMonth(code_entreprise);
    }

    @Get('performences-year/:code_entreprise')
    async getPerformencesYear( 
        @Param('code_entreprise') code_entreprise: string,
    ) {
        return this.dashAllService.getPerformencesYear(code_entreprise);
    } 

    @Get('performences-all/:code_entreprise')
    async getPerformencesAll(
        @Param('code_entreprise') code_entreprise: string,
    ) {
        return this.dashAllService.getPerformencesAll(code_entreprise);
    }


    // Finances
    @Get('masse-salarial-month/:code_entreprise')
    async masseSalarialMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.masseSalarialMonth(code_entreprise);
    }

    @Get('masse-salarial-year/:code_entreprise')
    async masseSalarialYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.masseSalarialYear(code_entreprise);
    }

    @Get('masse-salarial-all/:code_entreprise')
    async masseSalarialAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.masseSalarialAll(code_entreprise);
    }

    // Statut de paie disponible et traitements

    @Get('statut-paie-month/:code_entreprise')
    async statutPaieMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.statutPaieMonth(code_entreprise);
    }

    @Get('statut-paie-year/:code_entreprise')
    async statutPaieYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.statutPaieYear(code_entreprise);
    }

    @Get('statut-paie-all/:code_entreprise')
    async statutPaieAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.statutPaieAll(code_entreprise);
    }

 // Alocations logement, transport, famillial, soins medicaux
    @Get('allocation-month/:code_entreprise')
    async allocationMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.allocationMonth(code_entreprise);
    }

    @Get('allocation-year/:code_entreprise')
    async allocationYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.allocationYear(code_entreprise);
    }

    @Get('allocation-all/:code_entreprise')
    async allocationALl(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.allocationALl(code_entreprise);
    }


// Presences

    @Get('presence-month/:code_entreprise')
    async presencePieMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.presencePieMonth(code_entreprise);
    }

    @Get('presence-year/:code_entreprise')
    async presencePieYEAR(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.presencePieYEAR(code_entreprise);
    }

    @Get('presence-all/:code_entreprise')
    async presencePieAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.presencePieAll(code_entreprise);
    }

    
    // Recrutements

    @Get('recrutements-total-month/:code_entreprise')
    async recrutementsTotalMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.recrutementsTotalMonth(code_entreprise);
    }

    @Get('recrutements-total-year/:code_entreprise')
    async recrutementsTotalYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.recrutementsTotalYear(code_entreprise);
    }

    @Get('recrutements-total-all/:code_entreprise')
    async recrutementsTotalAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.recrutementsTotalAll(code_entreprise);
    }


    @Get('postulants-total-month/:code_entreprise')
    async postulantsTotalMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.postulantsTotalMonth(code_entreprise);
    }

    @Get('postulants-total-year/:code_entreprise')
    async postulantsTotalYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.postulantsTotalYear(code_entreprise);
    }

    @Get('postulants-total-all/:code_entreprise')
    async postulantsTotalAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.postulantsTotalAll(code_entreprise);
    }
}
