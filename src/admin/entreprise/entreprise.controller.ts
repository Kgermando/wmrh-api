import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { EntrepriseService } from './entreprise.service';
import { EntrepriseCreateDto } from './models/entreprise-create.dto';
import { EntrepriseUpdateDto } from './models/entreprise-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('entreprises')
export class EntrepriseController {
    constructor(
        private entrepriseService: EntrepriseService
    ) {}

    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.entrepriseService.allGet(code_entreprise);
    }

    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.entrepriseService.paginate(page, code_entreprise);
    }

    @Post()
    async create(
        @Body() body: EntrepriseCreateDto
    ) {
        return this.entrepriseService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.entrepriseService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: EntrepriseUpdateDto
    ) {
        const update_created = new Date();
        await this.entrepriseService.update(id, {...body, update_created});
        return this.entrepriseService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.entrepriseService.delete(id);
    }
}
