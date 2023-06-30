import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Candidature } from './models/candidature.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CandidatureService extends AbstractService {
    constructor(
        @InjectRepository(Candidature) private readonly candidatureRepository: Repository<Candidature>
    ) {
        super(candidatureRepository); 
    }

}
