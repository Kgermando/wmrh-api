import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { DepartementService } from './departement.service'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { DepartementCreateDto } from './models/departement.create.dto';
import { DepartementUpdateDto } from './models/departement.update.dto';


@UseGuards(AuthGuard)
@Controller('departements')
export class DepartementController {
    constructor(
        private departementService: DepartementService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.departementService.all(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.departementService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: DepartementCreateDto
    ) {
        return this.departementService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
      return this.departementService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: DepartementUpdateDto
    ) {
        await this.departementService.update(id, body);
        return this.departementService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.departementService.delete(id);
    }
} 
