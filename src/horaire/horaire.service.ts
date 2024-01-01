import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Horaire } from './models/horaire.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class HoraireService extends AbstractService {
    constructor(
        @InjectRepository(Horaire) private readonly horaireRepository: Repository<Horaire>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(horaireRepository); 
    }

    findGetAll(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM horaires 
            WHERE "corporateId"='${id}' ORDER BY created ASC;
        `);
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            where: {code_entreprise},
            order: {'created': 'DESC'}
        });
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
        })
    }
}
