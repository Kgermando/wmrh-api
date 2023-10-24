import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { IndemniteContent } from './models/indemnite-content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IndemniteContentService extends AbstractService {
    constructor(
        @InjectRepository(IndemniteContent) private readonly indemniteConentRepository: Repository<IndemniteContent>
    ) {
        super(indemniteConentRepository);
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            relations: [
                'indemnites',
            ],
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
