import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CorporateService } from './corporate.service';
import { CorporateCreateDto } from './models/corporate-create.dto';
import { CorporateUpdateDto } from './models/corporate-update.dto';

@UseGuards(AuthGuard)
@Controller('corporates')
export class CorporateController {
    constructor(
        private corporateService: CorporateService
    ) {}

    @Get('get-all-navigation/:code_entreprise')
    async allGetNavigation(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.corporateService.allGetNavigation(code_entreprise);
    }

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.corporateService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.corporateService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: CorporateCreateDto
    ) {
        return this.corporateService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
      return this.corporateService.findGetOne({id});
    }

    @Get('get-one/:id')
    async getOne(@Param('id') id: number) {
      return this.corporateService.getOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: CorporateUpdateDto
    ) {
        const update_created = new Date();
        await this.corporateService.update(id, {...body, update_created}); 
        return this.corporateService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.corporateService.delete(id);
    }
}
