import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service'; 
import { Repository } from 'typeorm';
import { Poste } from './models/poste.entity';

@Injectable()
export class PosteService extends AbstractService {
    constructor(
        @InjectRepository(Poste) private readonly posteRepository: Repository<Poste>
    ) {
        super(posteRepository); 
    }
}
