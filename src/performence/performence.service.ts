import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { Performence } from './models/performence.entity';

@Injectable()
export class PerformenceService extends AbstractService {
    constructor(
        @InjectRepository(Performence) private readonly performenceRepository: Repository<Performence>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(performenceRepository); 
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            relations: {
                personnel: true
            },
            where: {code_entreprise},
            order: {'created': 'DESC'}
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

    ponctualiteTotal(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(ponctualite), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }


    hospitaliteTotal(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(hospitalite), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    travailTotal(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(travail), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }


    getPieYEAR(code_entreprise, id) {
        return this.dataSource.query(`
        SELECT ponctualite,hospitalite,travail, EXTRACT(MONTH FROM "created" ::TIMESTAMP) as month
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY ponctualite,hospitalite,travail, month;
        `);
    }

    getPieAll(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT ponctualite,hospitalite,travail, EXTRACT(MONTH FROM "created" ::TIMESTAMP) as month
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}'
            GROUP BY ponctualite,hospitalite,travail, month;
        `);
    }

    ponctualiteTotalYEAR(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(ponctualite), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}' AND 
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    hospitaliteTotalYEAR(code_entreprise, id) { 
        return this.dataSource.query(`
            SELECT COALESCE(SUM(hospitalite), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}' AND 
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    travailTotalYEAR(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(travail), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}' AND 
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    ponctualiteTotalALL(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(ponctualite), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}';
        `);
    }

    hospitaliteTotalALL(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(hospitalite), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}';
        `);
    }

    travailTotalALL(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(travail), 0) as sum
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            "personnelId"='${id}';
        `);
    }
    
}
