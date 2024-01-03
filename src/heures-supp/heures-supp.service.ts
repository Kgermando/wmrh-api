import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { HeureSupp } from './models/heures-supp.entity';

@Injectable()
export class HeuresSuppService extends AbstractService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
        @InjectRepository(HeureSupp) private readonly heureSuppRepository: Repository<HeureSupp>
    ) {
        super(heureSuppRepository); 
    }

    findGetAll(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM heures_supp 
            WHERE "corporateId"='${id}' ORDER BY created DESC;
        `);
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
}
