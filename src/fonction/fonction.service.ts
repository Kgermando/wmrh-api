import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Fonction } from './models/fonction.entity';

@Injectable()
export class FonctionService extends AbstractService {
    constructor(
        @InjectRepository(Fonction) private readonly fonctionRepository: Repository<Fonction>
    ) {
        super(fonctionRepository); 
    }
}
