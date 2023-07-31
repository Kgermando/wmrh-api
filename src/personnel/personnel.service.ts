import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Personnel } from './models/personnel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonnelService extends AbstractService {
    constructor(
        @InjectRepository(Personnel) private readonly  personnelRepository: Repository<Personnel>
    ) {
        super(personnelRepository); 
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            // relations: {
            //     presences: true,
            //     primes: true,
            //     penalites: true,
            //     avances_salaires: true,
            //     heures_supp: true,
            //     salaires: true,
            //     performences: true,
            // },
            where: {code_entreprise},
            order: {'created': 'DESC'}
        }); 
    }
    

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                presences: true,
                primes: true,
                penalites: true,
                avances_salaires: true,
                heures_supp: true,
                salaires: true,
                performences: true,
            }
        })
    }

    async paginate(page: number = 1, code_entreprise): Promise<any> {
        const {data, meta} = await super.paginate(page, code_entreprise);
        
        return {
            data: data.map(personnel => {
                const {password, ...data} = personnel;
                return data;
            }),
            meta
        }
    } 

    async presence(condition): Promise<any> {
        return await this.repository.findOne(condition)
    }

    getSyndicat(code_entreprise): Promise<any[]> {
        return this.repository.find(
            {
                where: {code_entreprise} && {syndicat: true}
            }); 
    }
}
 
