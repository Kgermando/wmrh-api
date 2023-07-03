import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';

import { ApointementService } from './apointement.service';
import { ApointementCreateDto } from './models/apointement-create.dto';
import { ApointementUpdateDto } from './models/apointement-update.dto';

@UseGuards(AuthGuard)
@Controller('apointements')
export class ApointementController {
    constructor(
        private apointementService: ApointementService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.apointementService.all(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.apointementService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: ApointementCreateDto
    ) {
        return this.apointementService.create(body);
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.apointementService.findOne({where: {id}});
    }

    @Put('get/:id')
    async update(
        @Param('id') id: number,
        @Body() body: ApointementUpdateDto
    ) {
        await this.apointementService.update(id, body);
        return this.apointementService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.apointementService.delete(id);
    }
}
