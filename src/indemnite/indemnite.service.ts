import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { Indemnite } from './models/indemnite.entity';

@Injectable()
export class IndemniteService extends AbstractService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
        @InjectRepository(Indemnite) private readonly indemniteRepository: Repository<Indemnite>
    ) {
        super(indemniteRepository);
    }

    findGetAll(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT "personnels"."id",
            "personnels"."nom",
            "personnels"."postnom",
            "personnels"."prenom",
            "personnels"."matricule",
            "indemnites"."intitule",
            "indemnites"."statut",
            "indemnites"."monnaie",
            "indemnites"."taux_dollard",
            "indemnites"."total_a_payer",
            "indemnites"."created",
            "indemnites"."update_created"
            FROM indemnites
            LEFT JOIN "personnels" ON "personnels"."id" = "indemnites"."personnelId"
            WHERE
            "corporatesId"='${id}' AND
            nom!='admin' AND
            "personnels"."is_delete"='false' 
            ORDER BY "personnels"."created" DESC; 
        `);
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            relations: [
                'personnel',
                'personnel.departements',
            ],
            where: {code_entreprise},
            order: {'created': 'DESC'}
        });
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: [
                'personnel',
                'personnel.departements',
                'content',
            ],
        })
    }

}

