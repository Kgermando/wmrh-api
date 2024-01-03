import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { AvanceSalaire } from './models/avance-salaire.entity';

@Injectable()
export class AvanceSalaireService extends AbstractService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
        @InjectRepository(AvanceSalaire) private readonly fonctionRepository: Repository<AvanceSalaire>
    ) {
        super(fonctionRepository);
    }

    findGetAll(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM avance_salaires 
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
