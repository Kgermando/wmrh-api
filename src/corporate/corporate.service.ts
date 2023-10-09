import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Corporate } from './models/corporate.entity';

@Injectable()
export class CorporateService extends AbstractService {
    constructor(
        @InjectRepository(Corporate) private readonly corporateRepository: Repository<Corporate>
    ) {
        super(corporateRepository); 
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            // relations: {
            //     personnels: true,
            //     site_locations: true,
            // },
            relations: [
                'personnels',  
                'site_locations.personnels'
            ],
            where: {code_entreprise},
            order: {'created': 'DESC'}
        }); 
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            // relations: [
            //     'personnel', 
            //     'departements', 
            //     'titles', 
            //     'fonctions', 
            //     'services', 
            //     'site_locations',
            //     'corporate.departements', 
            //     'corporate.titles', 
            //     'corporate.fonctions', 
            //     'corporate.services', 
            //     'corporate.site_locations',
            // ],
            relations: {
                personnels: true,
                departements: true,
                site_locations: true,
                services: true,
                fonctions: true,
                titles: true,
            }
        })
    }
}
