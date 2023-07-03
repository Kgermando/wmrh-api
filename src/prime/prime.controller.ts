import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { PrimeService } from './prime.service';
import { PrimeCreateDto } from './models/prime-create.dto';

@Controller('prime')
export class PrimeController {
    constructor(
        private primeService: PrimeService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.primeService.all(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.primeService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: PrimeCreateDto
    ) {
        return this.primeService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.primeService.findOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: PrimeCreateDto
    ) {
        await this.primeService.update(id, body);
        return this.primeService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.primeService.delete(id);
    }
}
