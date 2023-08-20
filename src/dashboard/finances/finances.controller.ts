import { Controller, Get, Param } from '@nestjs/common';
import { FinancesService } from './finances.service';

@Controller('dashboard-finances')
export class FinancesController {
    constructor(
        private financesService: FinancesService
    ) {}

    @Get('total-ipr-month/:code_entreprise')
    async iprMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.financesService.iprMonth(code_entreprise);
    }

    @Get('total-cnss-qpo-month/:code_entreprise')
    async cnssQPOMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.financesService.cnssQPOMonth(code_entreprise);
    }

    @Get('total-rbi-month/:code_entreprise')
    async totalRBIMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.financesService.totalRBIMonth(code_entreprise);
    }

    @Get('total-ipr-year/:code_entreprise')
    async iprYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.financesService.iprYear(code_entreprise);
    }

    @Get('total-cnss-qpo-year/:code_entreprise')
    async cnssQPOYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.financesService.cnssQPOYear(code_entreprise);
    }

    @Get('total-rbi-year/:code_entreprise')
    async totalRBIYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.financesService.totalRBIYear(code_entreprise);
    }

    @Get('total-ipr-all/:code_entreprise')
    async iprAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.financesService.iprAll(code_entreprise);
    }

    @Get('total-cnss-qpo-all/:code_entreprise')
    async cnssQPOAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.financesService.cnssQPOAll(code_entreprise);
    }

    @Get('total-rbi-all/:code_entreprise')
    async totalRBIAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.financesService.totalRBIAll(code_entreprise);
    }



    // Depenses

    @Get('total-depenses-paye-month/:code_entreprise')
    async depensePayEMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.financesService.depensePayEMonth(code_entreprise);
    }

    @Get('total-depenses-paye-year/:code_entreprise')
    async depensePayEYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.financesService.depensePayEYear(code_entreprise);
    }

    @Get('total-depenses-paye-all/:code_entreprise')
    async depensePayEALl(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.financesService.depensePayEALl(code_entreprise);
    }

}
