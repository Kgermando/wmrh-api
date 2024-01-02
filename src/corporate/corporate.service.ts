import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { Corporate } from './models/corporate.entity';

@Injectable()
export class CorporateService extends AbstractService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
        @InjectRepository(Corporate) private readonly corporateRepository: Repository<Corporate>
    ) {
        super(corporateRepository); 
    }

    allGetNavigation(code_entreprise): Promise<any[]> {
        // var code = code_entreprise.split("-");
        // var code_entreprise = code[0];
        
        return this.dataSource.query(`
            SELECT *
            FROM corporate 
            WHERE "code_entreprise"='${code_entreprise}' 
            ORDER BY created DESC;
        `);
        // return this.repository.find({ 
        //     where: {code_entreprise},
        //     order: {'created': 'DESC'}
        // });
    }

    allGet(code_entreprise): Promise<any[]> {
        var code = code_entreprise.split("-");
        var code_entreprise = code[0];
        return this.repository.find({
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
