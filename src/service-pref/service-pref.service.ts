import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { ServicePref } from './models/service-pref.entity';

@Injectable()
export class ServicePrefService extends AbstractService {
    constructor(
        @InjectRepository(ServicePref) private readonly servicePrefRepository: Repository<ServicePref>
    ) {
        super(servicePrefRepository); 
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
