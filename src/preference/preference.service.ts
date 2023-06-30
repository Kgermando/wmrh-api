import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Preference } from './models/preference.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PreferenceService extends AbstractService {
    constructor(
        @InjectRepository(Preference) private readonly preferenceRepository: Repository<Preference>
    ) {
        super(preferenceRepository); 
    }
}
