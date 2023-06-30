import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Title } from './models/title.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TitleService extends AbstractService {
    constructor(
        @InjectRepository(Title) private readonly titleRepository: Repository<Title>
    ) {
        super(titleRepository); 
    }

}
