import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service'; 
import { Repository } from 'typeorm';
import { SiteLocation } from './models/site-location.entity';


@Injectable()
export class SiteLocationService extends AbstractService {
    constructor(
        @InjectRepository(SiteLocation) private readonly siteLocationRepository: Repository<SiteLocation>
    ) {
        super(siteLocationRepository); 
    }
}
