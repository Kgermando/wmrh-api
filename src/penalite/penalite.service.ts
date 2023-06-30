import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Penalite } from './models/pernalite.entity';

@Injectable()
export class PenaliteService extends AbstractService {
    constructor(
        @InjectRepository(Penalite) private readonly fonctionRepository: Repository<Penalite>
    ) {
        super(fonctionRepository); 
    }
}