import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { Apointement } from './models/apointement.entity';

@Injectable()
export class ApointementService extends AbstractService {
    constructor(
        @InjectRepository(Apointement) private readonly apointementRepository: Repository<Apointement>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(apointementRepository); 
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            relations: {
                personnel: true
            },
            where: {code_entreprise},
            order: {'date_entree': 'DESC'}
        }); 
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                personnel: true
            }
        })
    }

    getMatricule(code_entreprise, matricule): Promise<any[]> {
        return this.repository.find(
            {
                where: {code_entreprise} && {matricule}
            }); 
    }

    getLastItem(code_entreprise, matricule) {
        return this.dataSource.query(`
            SELECT *
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
            matricule='${matricule}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            ORDER BY date_entree DESC LIMIT 1;
        `);
    } 

    getPie(code_entreprise, matricule) {
        return this.dataSource.query(`
            SELECT apointement, COUNT(*) 
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
            matricule='${matricule}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY apointement;
        `);
    }

    getPieYEAR(code_entreprise, matricule) {
        return this.dataSource.query(`
            SELECT apointement, COUNT(*) 
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
            matricule='${matricule}' AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY apointement;
        `);
    }

    getPieAll(code_entreprise, matricule) {
        return this.dataSource.query(`
            SELECT apointement, COUNT(*) 
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
            matricule='${matricule}'
            GROUP BY apointement;
        `);
    }

    
}
