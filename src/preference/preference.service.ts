import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Preference } from './models/preference.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PreferenceService extends AbstractService {
    constructor(
        @InjectRepository(Preference) private readonly preferenceRepository: Repository<Preference>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(preferenceRepository); 
    } 

    async preference (condition: string) {
        return this.dataSource.query(`+
            SELECT * FROM preferences WHERE 'code_entreprise'=${condition} FETCH FIRST ROW ONLY;
        `);
    }
}
