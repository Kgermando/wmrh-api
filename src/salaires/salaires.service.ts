import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, LessThanOrEqual, Repository } from 'typeorm';
import { Salaire } from './models/salaire.entity';
import { Workbook } from 'exceljs';
import * as tmp  from 'tmp'; 
import { SalaireExcel } from './models/salaire_excel';

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



    async downloadExcel(code_entreprise, start_date, end_date) {

        let data: SalaireExcel[] = [];

        data = await this.dataSource.query(`
            SELECT *
            FROM salaires 
            LEFT JOIN "personnels" ON "personnels"."id" = "salaires"."personnelId"
            WHERE
            "salaires"."code_entreprise"='${code_entreprise}' AND
            "salaires"."created">='${start_date}' AND 
            "salaires"."created"<='${end_date}';
        `); 

        if(!data) {
            throw new NotFoundException("No data download");
        }

        let rows: SalaireExcel[] = [];

        data.forEach(doc => {
            rows.push(doc);
        });

        console.log('row', rows);

        let book = new Workbook();
        let sheet = book.addWorksheet('LISTE DES EMPLOYES');

        const headers = [
            { header: 'ID', key: 'id', width: 10.5 }, 
            { header: 'Matricule', key: 'matricule', width: 20.5 },
            { header: 'Nom', key: 'nom', width: 20.5 },
            { header: 'Post-nom', key: 'postnom', width: 20.5 },
            { header: 'Prénom', key: 'prenom', width: 20.5 },
            { header: 'Mail', key: 'email', width: 20.5 },
            { header: 'Téléphone', key: 'telephone', width: 20.5 },
            
            { header: 'Monnaie', key: 'monnaie', width: 20.5 },
            { header: 'Taux d\'échange', key: 'taux_dollard', width: 30.5 },
            { header: 'Nbre de dépendants', key: 'nbr_dependants', width: 20.5 }, 
            { header: 'Alloc. logement', key: 'alloc_logement', width: 20.5 },
            { header: 'Alloc. transport', key: 'alloc_transport', width: 20.5 },
            { header: 'Alloc. familliale', key: 'alloc_familliale', width: 20.5 },
            { header: 'Soins médicaux', key: 'soins_medicaux', width: 20.5 },
            { header: 'Salaire base', key: 'salaire_base', width: 20.5 },
            { header: 'Primes divers', key: 'primes', width: 20.5 },
            { header: 'Age ancienneté', key: 'anciennete_nbr_age', width: 20.5 },
            { header: 'Prime ancienneté', key: 'prime_anciennete', width: 20.5 },
            { header: 'Heures supp.', key: 'heures_supp', width: 20.5 },
            { header: 'Tarif Heures supp.', key: 'heure_supplementaire_monnaie', width: 20.5 },
            { header: 'Conge payé', key: 'conge_paye', width: 20.5 },
            { header: 'Nbre des jr presté', key: 'nbre_jrs_preste', width: 20.5 },
            { header: 'Nbre des jrs ferié', key: 'nbre_jrs_ferie', width: 20.5 },
            { header: 'RBI', key: 'rbi', width: 20.5 },
            { header: 'CNSS QPO', key: 'cnssQPO', width: 20.5 },
            { header: 'RNI', key: 'rni', width: 20.5 },
            { header: 'IPR', key: 'ipr', width: 20.5 },
            { header: 'penalités', key: 'penalites', width: 20.5 },
            { header: 'Avance salaire', key: 'avance_slaire', width: 20.5 },
            { header: 'Syndicat', key: 'syndicat', width: 20.5 },
            { header: 'Frais bancaire', key: 'prise_en_charge_frais_bancaire', width: 20.5 },
            { header: 'Près entreprise', key: 'pres_entreprise', width: 20.5 },
            { header: 'Net à payer', key: 'net_a_payer', width: 20.5 },
            
            { header: 'Signature', key: 'signature', width: 20.5 },
            { header: 'Date de création', key: 'created', width: 20.5 },
            { header: 'Mise à jour', key: 'update_created', width: 20.5 }, 
        ]

        sheet.columns = headers;
        sheet.addRows(rows);

        this.styleSheet(sheet);

        let File = await new Promise((resolve, reject) => {
            tmp.file({discardDescriptor: true, prefix: `myexcelsheet`, postfix: '.xlsx', mode: parseInt('0600', 8)},
                async (err, file) => {
                if(err) throw new BadRequestException(err); 

                book.xlsx.writeFile(file).then(_ => {
                    console.log('_', resolve(file));
                    resolve(file)
                }).catch(err => {
                    throw new BadRequestException(err);
                });
            });
        });

        return File;
    }



    private styleSheet(sheet) {

        // Set the height of header
        sheet.getRow(1).height = 30.5;

        // Font color
        sheet.getRow(1).font = { size: 11.5, bold: true, color: {argb: 'FFFFFF'}};

        // Background color
        sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', bgColor: {argb: '1E4C87'}, fgColor: { argb: '1E4C87'}};

        // Alignments
        sheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

        // Border
        sheet.getRow(1).border = {
            top: { style: 'thin', color: { argb: '000000'}},
            left: { style: 'thin', color: { argb: 'FFFFFF'}}, 
            bottom: { style: 'thin', color: { argb: '000000'}},
            right: { style: 'thin', color: { argb: 'FFFFFF'}}
        }

    }
}
