import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { CorporateReglageService } from './corporate-reglage.service';
import { CorporateReglageCreateDto } from './models/corporate-reglage-create.dto';
import { CorporateReglageUpdateDto } from './models/corporate-reglage-update.dto';


@UseGuards(AuthGuard)
@Controller('corporate-reglages')
export class CorporateReglageController {
    constructor(
        private corporateReglageService: CorporateReglageService
    ) {}

    @Get('preference/:code_entreprise')
    async preference(@Param('code_entreprise') code_entreprise: string) { 
        return this.corporateReglageService.preference({code_entreprise});
    }


    @Post()
    async create(
        @Body() body: CorporateReglageCreateDto
    ) {
        return this.corporateReglageService.create(body);
    }


    @Put(':code_entreprise/:signature')
    async update(
        @Param('code_entreprise') code_entreprise: string,
        @Param('signature') signature: string,
        @Body() body: CorporateReglageUpdateDto
    ) { 
        const update_created = new Date(); 
        await this.corporateReglageService.updatePref({code_entreprise}, {...body, signature, update_created});
        return this.corporateReglageService.preference({code_entreprise}); 
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.corporateReglageService.delete(id);
    }


    @Get('get-all')
    async getAll() {
      return this.corporateReglageService.all();
    }
}
