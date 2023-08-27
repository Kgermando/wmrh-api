import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class PresencesService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
    ) {}


    getPie(code_entreprise) {
        return this.dataSource.query(`
            SELECT apointement, COUNT(*) 
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY apointement;
        `);
    }
 
    getCourbePresenceMonth(code_entreprise) {
        return this.dataSource.query(`
        SELECT 
        
        (SELECT COUNT(apointement) FROM apointements WHERE
        code_entreprise='${code_entreprise}' AND apointement='P') AS p,

        (SELECT COUNT(apointement) FROM apointements WHERE
        code_entreprise='${code_entreprise}' AND apointement='A') AS a,

        (SELECT COUNT(apointement) FROM apointements WHERE
        code_entreprise='${code_entreprise}' AND apointement='AA') AS aa, 
 
        EXTRACT(DAY FROM "created" ::TIMESTAMP) as day
            FROM apointements WHERE
            code_entreprise='${code_entreprise}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY day;
        `);
    }

    getCourbePresenceYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT 
        
        (SELECT COUNT(apointement) FROM apointements WHERE
        code_entreprise='${code_entreprise}' AND apointement='P') AS p,

        (SELECT COUNT(apointement) FROM apointements WHERE
        code_entreprise='${code_entreprise}' AND apointement='A') AS a,

        (SELECT COUNT(apointement) FROM apointements WHERE
        code_entreprise='${code_entreprise}' AND apointement='AA') AS aa, 
 
 
        EXTRACT(MONTH FROM "created" ::TIMESTAMP) as month

        FROM apointements WHERE
            code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY month; 
        `);
    }

    getCourbePresenceAll(code_entreprise) {
        return this.dataSource.query(`
        SELECT 
        
        (SELECT COUNT(apointement) FROM apointements WHERE
        code_entreprise='${code_entreprise}' AND apointement='P') AS p,

        (SELECT COUNT(apointement) FROM apointements WHERE
        code_entreprise='${code_entreprise}' AND apointement='A') AS a,

        (SELECT COUNT(apointement) FROM apointements WHERE
        code_entreprise='${code_entreprise}' AND apointement='AA') AS aa, 
 
 
        EXTRACT(YEAR FROM "created" ::TIMESTAMP) as year

        FROM apointements WHERE
            code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) 
            GROUP BY year;
        `);
    } 
}
 