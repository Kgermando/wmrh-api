import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { SalaireCreateDto } from './models/salaire-create.dto';
import { SalaireUpdateDto } from './models/salaire-update.dto'; 
import { SalairesService } from './salaires.service';


@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('salaires')
export class SalairesController {
    constructor(
        private salaireService: SalairesService
    ) {}

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
        await this.salaireService.update(id, body);
        return this.salaireService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.salaireService.delete(id);
    }
}
