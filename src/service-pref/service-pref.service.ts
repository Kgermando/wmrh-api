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

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                personnels: true, 
            }
        })
    }
}
