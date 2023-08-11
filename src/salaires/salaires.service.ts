import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Between, DataSource, Equal, Repository } from 'typeorm';
import { Salaire } from './models/salaire.entity';

@Injectable()
export class SalairesService extends AbstractService {
    constructor(
        @InjectRepository(Salaire) private readonly salaireRepository: Repository<Salaire>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(salaireRepository); 
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            // relations: {
            //     personnel: true
            // },
            relations: [
                'personnel', 
                'personnel.departements', 
                'personnel.titles', 
                'personnel.fonctions', 
                'personnel.services', 
                'personnel.site_locations'
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
                'personnel.titles', 
                'personnel.fonctions', 
                'personnel.services', 
                'personnel.site_locations'
            ], 
        })
    }

    relevePaie(code_entreprise) {
        return this.repository.find({
            relations: [
                'personnel', 
                'personnel.departements', 
                'personnel.titles', 
                'personnel.fonctions', 
                'personnel.services', 
                'personnel.site_locations'
            ], 
            where: {code_entreprise} && {statut: 'Disponible'}, 
            order: {'created': 'DESC'}
        }); 
    }

    getJrPrestE(code_entreprise, matricule) {
        return this.dataSource.query(`
        SELECT  (

            (SELECT count(*) FILTER (WHERE apointement='P') as p
            FROM apointements WHERE 
                code_entreprise='${code_entreprise}' AND
                matricule='${matricule}'  AND
                        EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
                        EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            )  
            +
            (SELECT count(*) FILTER (WHERE apointement='AA') as aa
            FROM apointements WHERE 
                code_entreprise='${code_entreprise}' AND
                matricule='${matricule}'  AND
                        EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
                        EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            )  
            +
            (SELECT count(*) FILTER (WHERE apointement='S') as s
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
                matricule='${matricule}'  AND
                        EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
                        EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            )
            +
            (SELECT count(*) FILTER (WHERE apointement='M') as m
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
                matricule='${matricule}'  AND
                        EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
                        EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            )
             
        ) AS presence; 
        `);
    }

    getJrCongePayE(code_entreprise, matricule) {
        return this.dataSource.query(`
        SELECT  (

            (SELECT count(*) FILTER (WHERE apointement='AM') as am
            FROM apointements WHERE 
                code_entreprise='${code_entreprise}' AND
                matricule='${matricule}'  AND
                    CURRENT_DATE ::TIMESTAMP < date_sortie ::TIMESTAMP
            )
            +
            (SELECT count(*) FILTER (WHERE apointement='CA') as ca
            FROM apointements WHERE 
                code_entreprise='${code_entreprise}' AND
                matricule='${matricule}'  AND
                    CURRENT_DATE ::TIMESTAMP < date_sortie ::TIMESTAMP
            )  
            +
            (SELECT count(*) FILTER (WHERE apointement='CC') as cc
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
                matricule='${matricule}' AND CURRENT_DATE ::TIMESTAMP < date_sortie ::TIMESTAMP
            )
             
            ) AS conge;
        `);
    }

    nbrHeureSupp(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(nbr_heures), 0) as sum
            FROM heures_supp  WHERE 
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) - 1  
            AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            OR 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = 12 AND 
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) < EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }


    primeTotalCDF(code_entreprise, id) {
        return this.dataSource.query(`
        SELECT COALESCE(SUM(cast(montant as decimal(10,2))), 0) as sum
            FROM primes  WHERE 
            monnaie='CDF' AND
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP)- 1  
            AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            OR EXTRACT(MONTH FROM "created" ::TIMESTAMP) = 12 AND 
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) < EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }
    primeTotalUSD(code_entreprise, id) {
        return this.dataSource.query(`
        SELECT COALESCE(SUM(cast(montant as decimal(10,2))), 0) as sum
            FROM primes WHERE 
            monnaie='USD' AND
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP)- 1  
            AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            OR EXTRACT(MONTH FROM "created" ::TIMESTAMP) = 12 AND 
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) < EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }


    penaliteTotalCDF(code_entreprise, id) {
        return this.dataSource.query(`
        SELECT COALESCE(SUM(cast(montant as decimal(10,2))), 0) as sum
            FROM penalites WHERE 
            monnaie='CDF' AND
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP)- 1  
            AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            OR EXTRACT(MONTH FROM "created" ::TIMESTAMP) = 12 AND 
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) < EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }
    penaliteTotalUSD(code_entreprise, id) {
        return this.dataSource.query(`
        SELECT COALESCE(SUM(cast(montant as decimal(10,2))), 0) as sum
            FROM penalites  WHERE 
            monnaie='USD' AND
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP)- 1  
            AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            OR EXTRACT(MONTH FROM "created" ::TIMESTAMP) = 12 AND 
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) < EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }


    avanceSalaireTotalCDF(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant as decimal(10,2))), 0) as sum
            FROM avance_salaires WHERE 
            monnaie='CDF' AND
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }
    avanceSalaireTotalUSD(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant as decimal(10,2))), 0) as sum
            FROM avance_salaires WHERE 
            monnaie='USD' AND
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    getAnciennete(code_entreprise, id, date_debut_contrat) {
        return this.dataSource.query(`
        SELECT current_date, 
        AGE(timestamp '${date_debut_contrat}') FROM personnels WHERE
        code_entreprise='${code_entreprise}' AND
        "id"='${id}';
    `); 
    }


    preEntrepriseCDF(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(deboursement as decimal(10,2))), 0) as sum
            FROM pres_entreprises WHERE 
            monnaie='CDF' AND
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
            CURRENT_DATE::TIMESTAMP < date_limit::TIMESTAMP;
        `);
    }
    preEntrepriseUSD(code_entreprise, id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(deboursement as decimal(10,2))), 0) as sum
            FROM pres_entreprises WHERE 
            monnaie='USD' AND
            code_entreprise='${code_entreprise}' AND
            "personnelId"='${id}' AND
            CURRENT_DATE::TIMESTAMP < date_limit::TIMESTAMP;
        `);
    }


    netAPayerTotal(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(net_a_payer as decimal(10,2))), 0) as sum
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    iprTotal(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(ipr as decimal(10,2))), 0) as sum
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    cnssQPOTotal(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(cnss_qpo as decimal(10,2))), 0) as sum
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    fraisBancaireTotal(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(prise_en_charge_frais_bancaire as decimal(10,2))), 0) as sum
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }
}
