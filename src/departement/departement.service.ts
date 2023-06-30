import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Departement } from './models/departement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartementService extends AbstractService {
    constructor(
        @InjectRepository(Departement) private readonly departementRepository: Repository<Departement>
    ) {
        super(departementRepository); 
    }

 }
