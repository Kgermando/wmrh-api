import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Apointement } from './models/apointement.entity';

@Injectable()
export class ApointementService extends AbstractService {
    constructor(
        @InjectRepository(Apointement) private readonly apointementRepository: Repository<Apointement>
    ) {
        super(apointementRepository); 
    }
}
