import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class FinancesService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
    ) {}

    async iprMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(ipr as decimal(10,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async cnssQPOMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(cnss_qpo as decimal(10,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async iprYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(ipr as decimal(10,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            statut='Disponible' AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async cnssQPOYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(cnss_qpo as decimal(10,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            statut='Disponible' AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async iprAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(ipr as decimal(10,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async cnssQPOAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(cnss_qpo as decimal(10,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            statut='Disponible' AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }


        // depensePayE
        depensePayEMonth(code_entreprise) {
            return this.dataSource.query(`
            SELECT SUM(cast(net_a_payer as decimal(10,2))) AS net_a_payer,  
                SUM(cast(ipr as decimal(10,2))) AS ipr,
                SUM(cast(cnss_qpo as decimal(10,2))) AS cnss_qpo, 
                EXTRACT(DAY FROM "created" ::TIMESTAMP) as day
                FROM salaires WHERE 
                code_entreprise='${code_entreprise}' AND  
                statut='Disponible' AND
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
                GROUP BY day;
            `);
        }
    
        depensePayEYear(code_entreprise) {
            return this.dataSource.query(`
            SELECT SUM(cast(net_a_payer as decimal(10,2))) AS net_a_payer,  
            SUM(cast(ipr as decimal(10,2))) AS ipr,
            SUM(cast(cnss_qpo as decimal(10,2))) AS cnss_qpo, 
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) as month
                FROM salaires WHERE 
                code_entreprise='${code_entreprise}' AND 
                statut='Disponible' AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
                GROUP BY month;
            `);
        }
    
        depensePayEALl(code_entreprise) {
            return this.dataSource.query(`  
                SELECT SUM(cast(net_a_payer as decimal(10,2))) AS net_a_payer,  
                SUM(cast(ipr as decimal(10,2))) AS ipr,
                SUM(cast(cnss_qpo as decimal(10,2))) AS cnss_qpo, 
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) as year_ans
                FROM salaires WHERE 
                code_entreprise='${code_entreprise}' AND  
                statut='Disponible' AND
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
                BETWEEN
                EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
                EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
                GROUP BY year_ans;

               
            `);
        } 
    
        // async typeContact () {
        //     return this.dataSource.query(`
        //         WITH resultat AS (SELECT COUNT(id) AS total FROM epidemie) 
        //         SELECT type_contact, COUNT(type_contact)*100/total AS pourcentage FROM resultat, 
        //         epidemie GROUP BY total, type_contact; 
        //     `);
        // }
}
