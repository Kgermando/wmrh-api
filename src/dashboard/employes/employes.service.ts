import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm'; 
import { DataSource } from 'typeorm';

@Injectable()
export class EmployesService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
    ) {}


    async getPieSexeMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT sexe, COUNT(sexe) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' 
         GROUP BY sexe;
        `);
    }

    async getPieSexeYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT sexe, COUNT(sexe) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' 
            GROUP BY sexe;
        `);
    }

    async getPieSexeAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT sexe, COUNT(sexe) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' 
            GROUP BY sexe;
        `);
    }


    async departementMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM departements WHERE code_entreprise='${code_entreprise}';
        `);
    }

    async syndicatMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM personnels WHERE code_entreprise='${code_entreprise}';
        `);
    }
    
    async siteLocationMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM site_locations WHERE code_entreprise='${code_entreprise}';
        `);
    }

    async compteActifMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND  
            statut_personnel=true;
        `);
    }



    async departementYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM departements WHERE code_entreprise='${code_entreprise}';
        `);
    }

    async syndicatYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND 
            syndicat=true ;
        `);
    }

    async siteLocationYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM site_locations WHERE code_entreprise='${code_entreprise}';
        `);
    }

    async compteActifYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND  
            statut_personnel=true;
        `);
    }

    async departementAll(code_entreprise) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM departements WHERE code_entreprise='${code_entreprise}';
        `);
    }

    async syndicatAll(code_entreprise) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND 
            syndicat=true;
        `);
    }

    async siteLocationAll(code_entreprise) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM site_locations WHERE code_entreprise='${code_entreprise}';
        `);
    }

    async compteActifAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM personnels WHERE code_entreprise='${code_entreprise}' AND  
            statut_personnel=true;
        `);
    }




    // Employés par departement
    async employeDepartementMonth(code_entreprise) {
        return this.dataSource.query(`
        SELECT departement, COUNT(*)
            FROM personnels WHERE code_entreprise='${code_entreprise}' 
            GROUP BY departement;
        `);
    }

    async employeDepartementYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT departement, COUNT(*)
            FROM personnels WHERE code_entreprise='${code_entreprise}' 
            GROUP BY departement;
        `);
    }

    async employeDepartementAll(code_entreprise) {
        return this.dataSource.query(`
        SELECT departement, COUNT(*)
            FROM personnels WHERE code_entreprise='${code_entreprise}'  
            GROUP BY departement;
        `);
    }


    // Age de contrat par employés

    async ageContratEmployeMonth(code_entreprise) {
        return this.dataSource.query(` 
            SELECT DISTINCT EXTRACT(DAY FROM date_debut_contrat ::TIMESTAMP),
            DATE_PART('DAY', AGE(CURRENT_DATE ::TIMESTAMP,"date_debut_contrat" ::TIMESTAMP)) AS age
            FROM personnels WHERE code_entreprise='${code_entreprise}' 
            GROUP BY date_debut_contrat;
        `);  
    }

    async ageContratEmployeYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT DISTINCT EXTRACT(MONTH FROM date_debut_contrat ::TIMESTAMP),
            DATE_PART('MONTH', AGE(CURRENT_DATE ::TIMESTAMP,"date_debut_contrat" ::TIMESTAMP)) AS age
            FROM personnels WHERE code_entreprise='${code_entreprise}' 
            GROUP BY date_debut_contrat;
        `);
    }

    async ageContratEmployeAll(code_entreprise) {
        return this.dataSource.query(`
        SELECT DISTINCT EXTRACT(YEAR FROM date_debut_contrat ::TIMESTAMP),
            DATE_PART('YEAR', AGE(CURRENT_DATE ::TIMESTAMP,"date_debut_contrat" ::TIMESTAMP)) AS age
            FROM personnels WHERE code_entreprise='${code_entreprise}'
            GROUP BY date_debut_contrat;
        `);
    }


    // Age des employés
    async agetEmployeMonth(code_entreprise) {
        return this.dataSource.query(` 
        SELECT DISTINCT EXTRACT(YEAR FROM date_naissance ::TIMESTAMP),
        DATE_PART('YEAR', AGE(CURRENT_DATE ::TIMESTAMP,"date_naissance" ::TIMESTAMP)) AS age
        FROM personnels WHERE code_entreprise='${code_entreprise}'
        GROUP BY date_naissance;
        `);  
    }

    async ageEmployeYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT DISTINCT EXTRACT(YEAR FROM date_naissance ::TIMESTAMP),
        DATE_PART('YEAR', AGE(CURRENT_DATE ::TIMESTAMP,"date_naissance" ::TIMESTAMP)) AS age
        FROM personnels WHERE code_entreprise='${code_entreprise}'
        GROUP BY date_naissance;
        `);
    }

    async ageEmployeAll(code_entreprise) {
        return this.dataSource.query(`
        SELECT DISTINCT EXTRACT(YEAR FROM date_naissance ::TIMESTAMP),
            DATE_PART('YEAR', AGE(CURRENT_DATE ::TIMESTAMP,"date_naissance" ::TIMESTAMP)) AS age
            FROM personnels WHERE code_entreprise='${code_entreprise}'
            GROUP BY date_naissance;
        `);
    }

}
