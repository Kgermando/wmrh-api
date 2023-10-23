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

    allGetNavigation(code_entreprise): Promise<any[]> {
        var code = code_entreprise.split("-");
        var code_entreprise = code[0];
        
        return this.repository.find({ 
            where: {code_entreprise},
            order: {'created': 'DESC'}
        }); 
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            // relations: {
            //     personnels: true,
            //     site_locations: true,
            // },
            relations: [
                'personnels',  
                'site_locations.personnels',
            ],
            where: {code_entreprise},
            order: {'created': 'DESC'}
        }); 
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: [ 
                'departements', 
                'titles', 
                'fonctions', 
                'services',  
                'departements', 
                'titles', 
                'fonctions', 
                'services', 
                'site_locations',

                'personnels',
                'site_locations.personnels',

                'primes',
                'penalites',
                'avances_salaires',
                'heures_supp',
                'salaires',
                'performences',
                'pres_entreprises',
                'horaires',
                'indemnites',
            ],
        })
    }
}
