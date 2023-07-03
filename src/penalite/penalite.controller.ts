import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { PenaliteService } from './penalite.service';
import { PenaliteCreateDto } from './models/pernalite-create.dto';
import { PenaliteUpdateDto } from './models/pernalite-update.dto';

@Controller('penalites')
export class PenaliteController {
    constructor(
        private penaliteService: PenaliteService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.penaliteService.all(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.penaliteService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: PenaliteCreateDto
    ) {
        return this.penaliteService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.penaliteService.findOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: PenaliteUpdateDto
    ) {
        await this.penaliteService.update(id, body);
        return this.penaliteService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.penaliteService.delete(id);
    }
}
