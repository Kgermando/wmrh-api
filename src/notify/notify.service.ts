import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Notify } from './models/notifiy.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class NotifyService extends AbstractService {
    constructor(
        @InjectRepository(Notify) private readonly notifyRepository: Repository<Notify>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(notifyRepository); 
    }

    allGet(code_entreprise, matricule): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM notifys 
            LEFT JOIN "personnels" ON "personnels"."id" = "notifys"."personnelId"
            WHERE
            "notifys"."code_entreprise"='${code_entreprise}' AND
            "personnels"."matricule"='${matricule}' ORDER BY "notifys"."created" DESC;
        `);
        // return this.repository.find({
        //     relations: {
        //         personnel: true
        //     },
        //     where: {code_entreprise} && { personnel.matricule },
        //     order: {'created': 'DESC'}
        // });
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                personnel: true
            }
        })
    }
}
