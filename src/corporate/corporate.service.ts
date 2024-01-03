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

    allGetNavigation(entreprise): Promise<any[]> {
        var code = entreprise.split("-");
        var code_entreprise = code[0];
        
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

    allGet(entreprise): Promise<any[]> {
        var code = entreprise.split("-");
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

    async getOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
        })
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: [ 
                'personnels',
                'departements.personnels', 
                'titles.personnels', 
                'fonctions.personnels', 
                'services.personnels',
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
