import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Personnel } from './models/personnel.entity';
import { DataSource, Repository } from 'typeorm';
import { Workbook } from 'exceljs';
import * as tmp  from 'tmp';

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

    async presence(condition): Promise<any> {
        return await this.repository.findOne(condition)
    }

    getSyndicat(code_entreprise): Promise<any[]> {
        return this.repository.find(
            {
                where: {code_entreprise} && {syndicat: true}
            }); 
    }



    async downloadExcel(code_entreprise, start_date, end_date) {

        const data = await this.dataSource.query(`
            SELECT *
            FROM personnels WHERE
            code_entreprise='${code_entreprise}' AND
            created>'${start_date}' AND created<'${end_date}';
        `)

        console.log('data', data);


        if(!data) {
            throw new NotFoundException("No data download");
        }

        let rows = [];

        data.forEach(doc => {
            rows.push(Object.values(doc)); 
        });

        let book = new Workbook();
        let sheet = book.addWorksheet('Liste des employes')
 
        rows.unshift(Object.keys(data[0]))

        sheet.addRows(rows)

        let file = await new Promise((resolve, reject) => {
            tmp.file({discardDescriptor: true, prefix: `myexcelsheet`, postfix: '.xlsx', mode: parseInt('0600', 8)},
                 async (err, file) => {
                    if(err) throw new BadRequestException(err);

                    book.xlsx.writeFile(file).then(_ => {
                        resolve(file)
                    }).catch(err => {
                        throw new BadRequestException(err)
                    })
                 })
        })

        return file;
    }
}
 
