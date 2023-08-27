import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm'; 
import { DataSource } from 'typeorm';

@Injectable()
export class EmployesService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
    ) {}

    async getPieSexeMonth(code_entreprise: string) {
        return this.dataSource.query(`
            SELECT sexe, COUNT(sexe) 
            FROM personnels WHERE code_entreprise='${code_entreprise}'  AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
         GROUP BY sexe;
        `);
    }

    async getPieSexeYear(code_entreprise: string) {
        return this.dataSource.query(`
        SELECT sexe, COUNT(sexe) 
            FROM personnels WHERE code_entreprise='${code_entreprise}'  AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY sexe;
        `);
    }

    async getPieSexeAll(code_entreprise: string) {
        return this.dataSource.query(`
            SELECT sexe, COUNT(sexe) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' 
            GROUP BY sexe;
        `);
    }


    async departementMonth(code_entreprise: string) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM departements WHERE code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async syndicatMonth(code_entreprise: string) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND 
            syndicat=true  AND  
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP); 
        `);
    }
    
    async siteLocationMonth(code_entreprise: string) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM site_locations WHERE code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async compteActifMonth(code_entreprise: string) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND  
            statut_personnel=true AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }



    async departementYear(code_entreprise: string) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM departements WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async syndicatYear(code_entreprise: string) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND 
            syndicat=true  AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async siteLocationYear(code_entreprise: string) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM site_locations WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async compteActifYear(code_entreprise: string) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND  
            statut_personnel=true AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async departementAll(code_entreprise: string) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM departements WHERE code_entreprise='${code_entreprise}';
        `);
    }

    async syndicatAll(code_entreprise: string) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND 
            syndicat=true;
        `);
    }

    async siteLocationAll(code_entreprise: string) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM site_locations WHERE code_entreprise='${code_entreprise}';
        `);
    }

    async compteActifAll(code_entreprise: string) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND  
            statut_personnel=true;
        `);
    }




    // Employés par departement
    async employeDepartementMonth(code_entreprise: string) {
        return this.dataSource.query(`
            SELECT COALESCE ("departement", LEFT('Non affecté', 40)) AS departement, COUNT(*)
            FROM personnels 
            LEFT JOIN "departements" ON "departements"."id" = "personnels"."departementsId"
            WHERE "personnels"."code_entreprise"='${code_entreprise}' AND
            EXTRACT(MONTH FROM "personnels"."created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "personnels"."created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY "departement";
        `); 
    }

    async employeDepartementYear(code_entreprise: string) {
        return this.dataSource.query(`
            SELECT COALESCE ("departement", LEFT('Non affecté', 40)) AS departement, COUNT(*)
            FROM personnels 
            LEFT JOIN "departements" ON "departements"."id" = "personnels"."departementsId"
            WHERE "personnels"."code_entreprise"='${code_entreprise}' AND
            EXTRACT(YEAR FROM "personnels"."created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY "departement"; 
        `);
    }

    async employeDepartementAll(code_entreprise: string) {
        return this.dataSource.query(`
            SELECT COALESCE("departement", LEFT('Non affecté', 40)) AS departement, COUNT(*)
            FROM personnels
            LEFT JOIN "departements" ON "departements"."id" = "personnels"."departementsId"
            WHERE "personnels"."code_entreprise"='${code_entreprise}' 
            GROUP BY "departement";
        `);
    }


    // Age de contrat par employés

    async ageContratEmployeMonth(code_entreprise: string) {
        return this.dataSource.query(`
            SELECT
            COUNT(case when date_part('year', age(date_debut_contrat))>=0 AND date_part('year', age(date_debut_contrat))<=5 then 1 end) as "Moins de 5 ans",
            COUNT(case when date_part('year', age(date_debut_contrat))>5 AND date_part('year', age(date_debut_contrat))<=10 then 1 end) as "Moins de 10 ans",
            COUNT(case when date_part('year', age(date_debut_contrat))>10 AND date_part('year', age(date_debut_contrat))<=15 then 1 end) as "Moins de 15 ans",
            COUNT(case when date_part('year', age(date_debut_contrat))>15 AND date_part('year', age(date_debut_contrat))<=20 then 1 end) as "Moins de 20 ans", 
            COUNT(case when date_part('year', age(date_debut_contrat))>20 AND date_part('year', age(date_debut_contrat))<=25 then 1 end) as "Moins de 25 ans",
            COUNT(case when date_part('year', age(date_debut_contrat))>25 then 1 end) as "Plus de 25 ans"
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async ageContratEmployeYear(code_entreprise: string) {
        return this.dataSource.query(`
        SELECT
        COUNT(case when date_part('year', age(date_debut_contrat))>=0 AND date_part('year', age(date_debut_contrat))<=5 then 1 end) as "Moins de 5 ans",
        COUNT(case when date_part('year', age(date_debut_contrat))>5 AND date_part('year', age(date_debut_contrat))<=10 then 1 end) as "Moins de 10 ans",
        COUNT(case when date_part('year', age(date_debut_contrat))>10 AND date_part('year', age(date_debut_contrat))<=15 then 1 end) as "Moins de 15 ans",
        COUNT(case when date_part('year', age(date_debut_contrat))>15 AND date_part('year', age(date_debut_contrat))<=20 then 1 end) as "Moins de 20 ans", 
        COUNT(case when date_part('year', age(date_debut_contrat))>20 AND date_part('year', age(date_debut_contrat))<=25 then 1 end) as "Moins de 25 ans",
        COUNT(case when date_part('year', age(date_debut_contrat))>25 then 1 end) as "Plus de 25 ans"
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async ageContratEmployeAll(code_entreprise: string) {
        return this.dataSource.query(`
        SELECT
            COUNT(case when date_part('year', age(date_debut_contrat))>=0 AND date_part('year', age(date_debut_contrat))<=5 then 1 end) as "Moins de 5 ans",
            COUNT(case when date_part('year', age(date_debut_contrat))>5 AND date_part('year', age(date_debut_contrat))<=10 then 1 end) as "Moins de 10 ans",
            COUNT(case when date_part('year', age(date_debut_contrat))>10 AND date_part('year', age(date_debut_contrat))<=15 then 1 end) as "Moins de 15 ans",
            COUNT(case when date_part('year', age(date_debut_contrat))>15 AND date_part('year', age(date_debut_contrat))<=20 then 1 end) as "Moins de 20 ans", 
            COUNT(case when date_part('year', age(date_debut_contrat))>20 AND date_part('year', age(date_debut_contrat))<=25 then 1 end) as "Moins de 25 ans",
            COUNT(case when date_part('year', age(date_debut_contrat))>25 then 1 end) as "Plus de 25 ans"
            FROM personnels WHERE code_entreprise='${code_entreprise}';
        `);
    }


    // Age des employés
    async agetEmployeMonth(code_entreprise: string) {
        return this.dataSource.query(` 
           SELECT
                COUNT(case when date_part('year', age(date_naissance))>=18 AND date_part('year', age(date_naissance))<=25 then 1 end) as "De 18-25 ans",
                COUNT(case when date_part('year', age(date_naissance))>25 AND date_part('year', age(date_naissance))<=35 then 1 end) as "De 25-35 ans",
                COUNT(case when date_part('year', age(date_naissance))>35 AND date_part('year', age(date_naissance))<=45 then 1 end) as "De 35-45 ans",
                COUNT(case when date_part('year', age(date_naissance))>45 AND date_part('year', age(date_naissance))<=55 then 1 end) as "De 45-55 ans", 
                COUNT(case when date_part('year', age(date_naissance))>55 AND date_part('year', age(date_naissance))<=65 then 1 end) as "De 55-65 ans"
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
            `);
    }

    async ageEmployeYear(code_entreprise: string) {
        return this.dataSource.query(`
        SELECT
            COUNT(case when date_part('year', age(date_naissance))>=18 AND date_part('year', age(date_naissance))<=25 then 1 end) as "De 18-25 ans",
            COUNT(case when date_part('year', age(date_naissance))>25 AND date_part('year', age(date_naissance))<=35 then 1 end) as "De 25-35 ans",
            COUNT(case when date_part('year', age(date_naissance))>35 AND date_part('year', age(date_naissance))<=45 then 1 end) as "De 35-45 ans",
            COUNT(case when date_part('year', age(date_naissance))>45 AND date_part('year', age(date_naissance))<=55 then 1 end) as "De 45-55 ans", 
            COUNT(case when date_part('year', age(date_naissance))>55 AND date_part('year', age(date_naissance))<=65 then 1 end) as "De 55-65 ans"
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async ageEmployeAll(code_entreprise: string) {
        return this.dataSource.query(`
            SELECT
                COUNT(case when date_part('year', age(date_naissance))>=18 AND date_part('year', age(date_naissance))<=25 then 1 end) as "De 18-25 ans",
                COUNT(case when date_part('year', age(date_naissance))>25 AND date_part('year', age(date_naissance))<=35 then 1 end) as "De 25-35 ans",
                COUNT(case when date_part('year', age(date_naissance))>35 AND date_part('year', age(date_naissance))<=45 then 1 end) as "De 35-45 ans",
                COUNT(case when date_part('year', age(date_naissance))>45 AND date_part('year', age(date_naissance))<=55 then 1 end) as "De 45-55 ans", 
                COUNT(case when date_part('year', age(date_naissance))>55 AND date_part('year', age(date_naissance))<=65 then 1 end) as "De 55-65 ans"
                FROM personnels WHERE code_entreprise='${code_entreprise}';
        `);
    }

}
