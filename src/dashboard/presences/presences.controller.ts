import { Controller, Get, Param } from '@nestjs/common';
import { PresencesService } from './presences.service';

@Controller('dashboard-presences')
export class PresencesController {
    constructor(
        private presencesService: PresencesService
    ) {}


    @Get('courbe-presences-month/:code_entreprise')
    async getCourbePresenceMonth(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.presencesService.getCourbePresenceMonth(code_entreprise);
    }

    @Get('courbe-presences-year/:code_entreprise')
    async getCourbePresenceYear(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.presencesService.getCourbePresenceYear(code_entreprise);
    }

    @Get('courbe-presences-all/:code_entreprise')
    async getCourbePresenceAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.presencesService.getCourbePresenceAll(code_entreprise);
    }
}
