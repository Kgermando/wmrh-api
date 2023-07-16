import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'; 
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

    @Get('preference/:code_entreprise')
    async preference(@Param('code_entreprise') code_entreprise: string) { 
        return this.preferenceService.preference({where: {code_entreprise}});
    }


    @Post()
    async create(
        @Body() body: PreferenceCreateDto
    ) {
        return this.preferenceService.create(body);
    }

 
    @Put(':code_entreprise')
    async update(
        @Param('code_entreprise') code_entreprise: string,
        @Body() body: PreferenceUpdateDto
    ) {
        await this.preferenceService.updatePref({code_entreprise}, body);
        return this.preferenceService.preference({where: {code_entreprise}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.preferenceService.delete(id);
    }


    // @Get('get-all/:code_entreprise')
    // async getAll(
    //   @Param('code_entreprise') code_entreprise: string,
    // ) {
    //   return this.preferenceService.all(code_entreprise);
    // }

    // @Get(':code_entreprise')
    // async all(
    //     @Query('page') page = 1,
    //     @Param('code_entreprise') code_entreprise: string
    //     ) {
    //     return this.preferenceService.paginate(page, code_entreprise);
    // }

       // @Get('get/:id')
    // async get(@Param('id') id: number) {
    //     return this.preferenceService.findOne({where: {id}});
    // }

}
