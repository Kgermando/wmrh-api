import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Departement } from './models/departement.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DepartementService extends AbstractService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
        @InjectRepository(Departement) private readonly departementRepository: Repository<Departement>
    ) {
        super(departementRepository); 
    } 

    findGetAll(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM departements 
            WHERE "corporateId"='${id}' ORDER BY created ASC;
        `);
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            relations: {
                personnels: true,
            },
            where: {code_entreprise},
            order: {'created': 'DESC'}
        }); 
    }


    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                personnels: true,
            }
        })
    }

 }
