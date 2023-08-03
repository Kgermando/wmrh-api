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


    // Finances Net à payer
    @Get('masse-salarial-month/:code_entreprise')
    async masseSalarialMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.masseSalarialMonth(code_entreprise);
    }

    @Get('masse-salarial-month-precedement/:code_entreprise')
    async masseSalarialMonthPrecedement(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.masseSalarialMonthPrecedement(code_entreprise);
    }

    @Get('masse-salarial-year/:code_entreprise')
    async masseSalarialYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.masseSalarialYear(code_entreprise);
    }

    @Get('masse-salarial-year-precedement/:code_entreprise')
    async masseSalarialYearPrecedement(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.masseSalarialYearPrecedement(code_entreprise);
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



    @Get('primes-month/:code_entreprise')
    async primesMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.primesMonth(code_entreprise);
    }

    @Get('primes-anciennete-month/:code_entreprise')
    async primeAncienneteMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.primeAncienneteMonth(code_entreprise);
    }

    @Get('penalites-month/:code_entreprise')
    async penaliteMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.penaliteMonth(code_entreprise);
    }

    @Get('avances-salaires-month/:code_entreprise')
    async avanceSalaireMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.avanceSalaireMonth(code_entreprise);
    }

    @Get('pres-entreprise-month/:code_entreprise')
    async presEntrepriseMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.presEntrepriseMonth(code_entreprise);
    }

    @Get('heures-supp-month/:code_entreprise')
    async heureSuppMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.heureSuppMonth(code_entreprise);
    }

    @Get('syndicats-month/:code_entreprise')
    async syndicatMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.syndicatMonth(code_entreprise);
    }

    @Get('primes-year/:code_entreprise')
    async primesYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.primesYear(code_entreprise);
    }

    @Get('primes-anciennete-year/:code_entreprise')
    async primeAncienneteYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.primeAncienneteYear(code_entreprise);
    }

    @Get('penalites-year/:code_entreprise')
    async penaliteYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.penaliteYear(code_entreprise);
    }

    @Get('avances-salaires-year/:code_entreprise')
    async avanceSalaireYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.avanceSalaireYear(code_entreprise);
    }

    @Get('pres-entreprise-year/:code_entreprise')
    async presEntrepriseYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.presEntrepriseYear(code_entreprise);
    }

    @Get('heures-supp-year/:code_entreprise')
    async heureSuppYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.heureSuppYear(code_entreprise);
    }

    @Get('syndicats-year/:code_entreprise')
    async syndicatYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.syndicatYear(code_entreprise);
    }

    @Get('primes-all/:code_entreprise')
    async primesAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.primesAll(code_entreprise);
    }
    @Get('primes-anciennete-all/:code_entreprise')
    async primeAncienneteAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.primeAncienneteAll(code_entreprise);
    }

    @Get('penalites-all/:code_entreprise')
    async penaliteAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.penaliteAll(code_entreprise);
    }


    @Get('avances-salaires-all/:code_entreprise')
    async avanceSalaireAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.avanceSalaireAll(code_entreprise);
    }

    @Get('pres-entreprise-all/:code_entreprise')
    async presEntrepriseAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.presEntrepriseAll(code_entreprise);
    }

    @Get('heures-supp-all/:code_entreprise')
    async heureSuppAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.heureSuppAll(code_entreprise);
    } 

    @Get('syndicats-all/:code_entreprise')
    async syndicatAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.syndicatAll(code_entreprise);
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

    
    @Get('postulants-retenus-total-month/:code_entreprise')
    async postulantsRetenuTotalMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.postulantsRetenuTotalMonth(code_entreprise);
    }

    @Get('postulants-retenus-total-year/:code_entreprise')
    async postulantsRetenuTotalYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.postulantsRetenuTotalYear(code_entreprise);
    }

    @Get('postulants-retenus-total-all/:code_entreprise')
    async postulantsRetenuTotalAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.dashAllService.postulantsRetenuTotalAll(code_entreprise);
    }
}
