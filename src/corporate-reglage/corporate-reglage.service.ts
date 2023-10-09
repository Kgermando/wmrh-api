import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service'; 
import { DataSource, Repository } from 'typeorm';
import { CorporateReglage } from './models/corporate-reglage.entity';

@Injectable()
export class CorporateReglageService extends AbstractService {
    constructor(
        @InjectRepository(CorporateReglage) private readonly corporateReglageRepository: Repository<CorporateReglage>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(corporateReglageRepository); 
    }

    all(): Promise<any[]> {
        return this.repository.find({
            relations: {
                company: true
            }
        }); 
    }

    async preference(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                company: true
            }
        })
    }

    async updatePref(condition, data): Promise<any> {
        return this.repository.update(condition, data);
    }
}
