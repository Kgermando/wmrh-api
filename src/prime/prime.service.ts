import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Prime } from './models/prime.entity';

@Injectable()
export class PrimeService extends AbstractService {
    constructor(
        @InjectRepository(Prime) private readonly fonctionRepository: Repository<Prime>
    ) {
        super(fonctionRepository); 
    }
}
