import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { PreferenceService } from './preference.service';
import { PreferenceCreateDto } from './models/preference-create.dto';
import { PreferenceUpdateDto } from './models/preference-update.dto';

@UseGuards(AuthGuard)
@Controller('preferences')
export class PreferenceController {
    constructor(
        private preferenceService: PreferenceService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.preferenceService.all(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.preferenceService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: PreferenceCreateDto
    ) {
        return this.preferenceService.create(body);
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.preferenceService.findOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: PreferenceUpdateDto
    ) {
        await this.preferenceService.update(id, body);
        return this.preferenceService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.preferenceService.delete(id);
    }
}
