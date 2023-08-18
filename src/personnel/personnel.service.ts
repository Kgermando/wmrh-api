import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Personnel } from './models/personnel.entity';
import { DataSource, Repository } from 'typeorm';
import { Workbook } from 'exceljs';
import * as tmp  from 'tmp'; 
import { PersonnelExcel } from './models/personnel_excel';
import { PersonnelCreateDto } from './models/personnel-create.dto';

@Injectable()
export class PersonnelService extends AbstractService {
    constructor(
        @InjectRepository(Personnel) private readonly  personnelRepository: Repository<Personnel>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(personnelRepository); 
    }

    allGet(code_entreprise): Promise<any[]> {
        return this.repository.find({
            // relations: {
            //     presences: true,
            //     primes: true,
            //     penalites: true,
            //     avances_salaires: true,
            //     heures_supp: true,
            //     salaires: true,
            //     performences: true,
            // },
            where: {code_entreprise},
            order: {'created': 'DESC'}
        }); 
    }
    

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                presences: true,
                primes: true,
                penalites: true,
                avances_salaires: true,
                heures_supp: true,
                salaires: true,
                performences: true,

                departements: true,
                titles: true,
                fonctions: true,
                services: true,
                site_locations: true,
            }
        })
    }

    

    async paginate(page: number = 1, code_entreprise): Promise<any> {
        const {data, meta} = await super.paginate(page, code_entreprise);
        
        return {
            data: data.map(personnel => {
                const {password, ...data} = personnel;
                return data;
            }),
            meta
        }
    }

    // async deleteItem(condition): Promise<any> {
    //     return await this.repository
    //     .createQueryBuilder('personnels')
    //     .delete()
    //     .from(Personnel)
    //     .where("id = :id", { id: condition })
    //     .execute();
    // }

    async presence(condition): Promise<any> {
        return await this.repository.findOne(condition);
    }

    getSyndicat(code_entreprise): Promise<any[]> {
        return this.repository.find(
            {
                where: {code_entreprise} && {syndicat: true}
            }); 
    }



    async downloadExcel(code_entreprise, start_date, end_date) {

        let data: PersonnelExcel[] = [];

        data = await this.dataSource.query(`
            SELECT *
            FROM personnels
            LEFT JOIN "departements" ON "departements"."id" = "personnels"."departementsId"
            LEFT JOIN "titles" ON "titles"."id" = "personnels"."titlesId"
            LEFT JOIN "fonctions" ON "fonctions"."id" = "personnels"."fonctionsId"
            LEFT JOIN "service_prefs" ON "service_prefs"."id" = "personnels"."servicesId"
            LEFT JOIN "site_locations" ON "site_locations"."id" = "personnels"."siteLocationsId"
            WHERE
            "personnels"."code_entreprise"='${code_entreprise}' AND
            "personnels"."created">='${start_date}' AND 
            "personnels"."created"<='${end_date}';
        `);

        if(!data) {
            throw new NotFoundException("No data download");
        }

        let rows: PersonnelExcel[] = [];

        data.forEach(doc => {
            rows.push(doc);
        });

        let book = new Workbook();
        let sheet = book.addWorksheet('LISTE DES EMPLOYES');

        const headers = [
            { header: 'ID', key: 'id', width: 10.5 },
            { header: 'Nom', key: 'nom', width: 20.5 },
            { header: 'Post-nom', key: 'postnom', width: 20.5 },
            { header: 'Prénom', key: 'prenom', width: 20.5 },
            { header: 'Mail', key: 'email', width: 30.5 },
            { header: 'Téléphone', key: 'telephone', width: 20.5 },
            { header: 'Adresse', key: 'adresse', width: 30.5 },
            { header: 'Sexe', key: 'sexe', width: 20.5 },
            { header: 'Date de naissance', key: 'date_naissance', width: 25.5 },
            { header: 'Lieu de naissance', key: 'lieu_naissance', width: 20.5 }, 
            { header: 'Nationalité', key: 'nationalite', width: 20.5 },
            { header: 'État civile', key: 'etat_civile', width: 20.5 },
            { header: 'Nbre de dépendants', key: 'nbr_dependants', width: 20.5 },
            { header: 'Matricule', key: 'matricule', width: 20.5 },
            { header: 'CNSS', key: 'numero_cnss', width: 20.5 },
            { header: 'Catégorie', key: 'category', width: 30.5 },
            { header: 'Département', key: 'departement', width: 30.5 },
            { header: 'Titre', key: 'title', width: 30.5 },
            { header: 'Fonction', key: 'fonction', width: 30.5 },
            { header: 'Service', key: 'service', width: 30.5 },
            { header: 'Site de travail', key: 'site_location', width: 30.5 },
            { header: 'Statut compte', key: 'statut_personnel', width: 20.5 },
            { header: 'Type de contrat', key: 'type_contrat', width: 20.5 },
            { header: 'Date debut contrat', key: 'date_debut_contrat', width: 20.5 },
            { header: 'Date fin contrat', key: 'date_fin_contrat', width: 20.5 },
            { header: 'Devise', key: 'monnaie', width: 10.5 },
            { header: 'Alloc. logement', key: 'alloc_logement', width: 20.5 },
            { header: 'Alloc. transport', key: 'alloc_transport', width: 20.5 },
            { header: 'Alloc. familliale', key: 'alloc_familliale', width: 20.5 },
            { header: 'Soins médicaux', key: 'soins_medicaux', width: 20.5 },
            { header: 'Salaire base', key: 'salaire_base', width: 20.5 },
            { header: 'Compte bancaire', key: 'compte_bancaire', width: 20.5 },
            { header: 'Nom banque', key: 'nom_banque', width: 20.5 },
            { header: 'Frais bancaire', key: 'frais_bancaire', width: 20.5 },
            { header: 'Syndicat', key: 'syndicat', width: 20.5 },
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




    async downloadModelExcel() {

        let data: any[] = [];

        data = [
            {
                nom: 'Eenge',
                postnom: 'Musala',
                prenom: 'Jean de Dieu',
                email: 'ekengejean@gmail.com',
                telephone: '+243813530868',
                adresse: 'Av. 31bis Oshué, Q/Matonge, C/Kalamu, kinshasa',
                sexe: 'Homme',
                matricule: 'entreprise',
                category: 'Cadres subalterne',
                roles: 'Dashboard',
                signature: 'Mon matricule',
                created: new Date(),
                update_created: new Date(), 
                entreprise: 'Entreprise',
                code_entreprise: 'Code Entreprise',
            },
            {
                nom: 'Senga',
                postnom: 'Mawete',
                prenom: 'Benedicte',
                email: 'sengabenedicte@gmail.com',
                telephone: '0853530845',
                adresse: 'Av. 31bis Oshué, Q/Matonge, C/Kalamu, kinshasa',
                sexe: 'Femme',
                matricule: 'mon matricule',
                category: 'Cadres subalterne',
                roles: 'Personnels',
                signature: 'Mon matricule',
                created: new Date(),
                update_created: new Date(), 
                entreprise: 'Entreprise',
                code_entreprise: 'Code Entreprise',
            },
        ]

        if(!data) {
            throw new NotFoundException("No data download");
        }

        let rows: any[] = [];

        data.forEach(doc => {
            rows.push(doc);
        });

        let book = new Workbook();
        let sheet = book.addWorksheet('MODEL D\'EXPORTATION DES EMPLOYES');

        const headers = [ 
            { header: 'Nom', key: 'nom', width: 20.5 },
            { header: 'Post-nom', key: 'postnom', width: 20.5 },
            { header: 'Prénom', key: 'prenom', width: 20.5 },
            { header: 'Mail', key: 'email', width: 30.5 },
            { header: 'Téléphone', key: 'telephone', width: 20.5 },
            { header: 'Adresse', key: 'adresse', width: 30.5 },
            { header: 'Sexe', key: 'sexe', width: 20.5 },
            { header: 'Matricule', key: 'matricule', width: 20.5 },
            { header: 'Catégorie', key: 'category', width: 30.5 }, 
            { header: 'Accréditation', key: 'roles', width: 20.5 },
            { header: 'Signature', key: 'signature', width: 20.5 },
            { header: 'Date de création', key: 'created', width: 20.5 },
            { header: 'Mise à jour', key: 'update_created', width: 20.5 },
            { header: 'Entreprise', key: 'entreprise', width: 20.5 },
            { header: 'Code Entreprise', key: 'code_entreprise', width: 20.5 },
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
 
