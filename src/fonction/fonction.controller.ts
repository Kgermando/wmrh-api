import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { FonctionService } from './fonction.service';
import { FonctionUpdateDto } from './models/fonction-update.dto';
import { FonctionCreateDto } from './models/fonction-create.dto';


// @UseGuards(AuthGuard)
@Controller('fonctions')
export class FonctionController {
    constructor(
        private fonctionService: FonctionService
    ) {}


    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.fonctionService.all(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.fonctionService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: FonctionCreateDto
    ) {
        return this.fonctionService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.fonctionService.findOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: FonctionUpdateDto
    ) {
        await this.fonctionService.update(id, body);
        return this.fonctionService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.fonctionService.delete(id);
    }
}
