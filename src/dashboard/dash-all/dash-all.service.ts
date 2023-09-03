import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export default class DashAllService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
    ) {}

    // EMPLOYES
    // Total EMPLOYES
    async totalEnmployesMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT count(*) as total
            FROM personnels WHERE 
            code_entreprise='${code_entreprise}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async totalEnmployesYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT count(*) as total
            FROM personnels WHERE 
            code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async totalEnmployesAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT count(*) as total
            FROM personnels WHERE 
            code_entreprise='${code_entreprise}';
        `);
    }

    
    // Total employés FEMMES
    async totalEnmployeFemmeMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT count(*) as total
            FROM personnels WHERE 
            code_entreprise='${code_entreprise}'  AND
            sexe='Femme' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async totalEnmployeFemmeYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT count(*) as total
            FROM personnels WHERE 
            code_entreprise='${code_entreprise}'  AND
            sexe='Femme' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async totalEnmployeFemmeAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT count(*) as total
            FROM personnels WHERE 
            code_entreprise='${code_entreprise}' AND
            sexe='Femme';
        `);
    }

    // Total emlployés HOMMES
    async totalEnmployeHommeMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT count(*) as total
            FROM personnels WHERE 
            code_entreprise='${code_entreprise}'  AND
            sexe='Homme' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async totalEnmployeHommeYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT count(*) as total
            FROM personnels WHERE 
            code_entreprise='${code_entreprise}'  AND
            sexe='Homme' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async totalEnmployeHommeAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT count(*) as total
            FROM personnels WHERE 
            code_entreprise='${code_entreprise}' AND
            sexe='Homme';
        `);
    }


    // Performences Employé
    getPerformencesMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT SUM(ponctualite) AS ponctualite,
                SUM(hospitalite) AS hospitalite,
                SUM(travail) AS travail,
                EXTRACT(DAY FROM "created" ::TIMESTAMP) as day
            FROM performences WHERE
            code_entreprise='${code_entreprise}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY day;
        `);
    }

    getPerformencesYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT SUM(ponctualite) AS ponctualite, 
                SUM(hospitalite) AS hospitalite, 
                SUM(travail) AS travail, 
                EXTRACT(MONTH FROM "created" ::TIMESTAMP) as month
            FROM performences WHERE 
            code_entreprise='${code_entreprise}' AND 
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY month;
        `);
    }

    getPerformencesAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT SUM(ponctualite) AS ponctualite, 
                SUM(hospitalite) AS hospitalite, 
                SUM(travail) AS travail, 
                EXTRACT(YEAR FROM "created" ::TIMESTAMP) as year
            FROM performences WHERE 
            code_entreprise='${code_entreprise}'  AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY year;
        `);
    } 


    // Finances

    // Masse salarial

    async masseSalarialMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(net_a_payer as decimal(20,2))), 0) as net_a_payer
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async masseSalarialMonthPrecedement(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(net_a_payer as decimal(20,2))), 0) as net_a_payer
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) - 1 AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

 
    async masseSalarialYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(net_a_payer as decimal(20,2))), 0) as net_a_payer
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async masseSalarialYearPrecedement(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(net_a_payer as decimal(20,2))), 0) as net_a_payer
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 1;
        `);
    }

    async masseSalarialAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(net_a_payer as decimal(20,2))), 0) as net_a_payer
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    // Statut de paie disponible et traitement
    async statutPaieMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT statut_paie, COUNT(statut_paie) 
            FROM personnels  
            WHERE code_entreprise='${code_entreprise}'
            GROUP BY statut_paie;
        `);
    }

    async statutPaieYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT statut_paie, COUNT(statut_paie) 
            FROM personnels  
            WHERE code_entreprise='${code_entreprise}'
            GROUP BY statut_paie;
        `);
    }

    async statutPaieAll(code_entreprise) {
        return this.dataSource.query(`
        SELECT statut_paie, COUNT(statut_paie) 
            FROM personnels  
            WHERE code_entreprise='${code_entreprise}'
            GROUP BY statut_paie AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) 
        `);
    } 


    // Alocations logement, transport, famillial, soins medicaux
    allocationMonth(code_entreprise) {
        return this.dataSource.query(`
        SELECT SUM(cast(alloc_logement as decimal(20,2))) AS logement, 
            SUM(cast(alloc_transport as decimal(20,2))) AS transport, 
            SUM(cast(alloc_familliale as decimal(20,2))) AS familliale,
            SUM(cast(soins_medicaux as decimal(20,2))) AS soins_medicaux, 
            EXTRACT(DAY FROM "created" ::TIMESTAMP) as day
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY day;
        `);
    }

    allocationYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT SUM(cast(alloc_logement as decimal(20,2))) AS logement, 
            SUM(cast(alloc_transport as decimal(20,2))) AS transport, 
            SUM(cast(alloc_familliale as decimal(20,2))) AS familliale,
            SUM(cast(soins_medicaux as decimal(20,2))) AS soins_medicaux, 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) as month
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND statut='Disponible' AND 
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY month;
        `);
    }

    allocationALl(code_entreprise) {
        return this.dataSource.query(`
        SELECT SUM(cast(alloc_logement as decimal(20,2))) AS logement, 
            SUM(cast(alloc_transport as decimal(20,2))) AS transport, 
            SUM(cast(alloc_familliale as decimal(20,2))) AS familliale,
            SUM(cast(soins_medicaux as decimal(20,2))) AS soins_medicaux, 
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) as year_ans
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY year_ans;
        `);
    }


    async primesMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(primes as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async primeAncienneteMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(prime_anciennete as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async penaliteMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(penalites as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async avanceSalaireMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(avance_slaire as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async presEntrepriseMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(pres_entreprise as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async heureSuppMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(heure_supplementaire_monnaie as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async syndicatMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(syndicat as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `); 
    }

 

    async primesYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(primes as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async primeAncienneteYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(prime_anciennete as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async penaliteYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(penalites as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async avanceSalaireYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(avance_slaire as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async presEntrepriseYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(pres_entreprise as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async heureSuppYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(heure_supplementaire_monnaie as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async syndicatYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(syndicat as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `); 
    }



    async primesAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(primes as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async primeAncienneteAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(prime_anciennete as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async penaliteAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(penalites as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async avanceSalaireAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(avance_slaire as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async presEntrepriseAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(pres_entreprise as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async heureSuppAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(heure_supplementaire_monnaie as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async syndicatAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(syndicat as decimal(20,2))), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND statut='Disponible' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }



    // Presences

    // Taux de presence, absence, maladie, ....
    presencePieMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT apointement, COUNT(*) 
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY apointement;
        `);
    }

    presencePieYEAR(code_entreprise) {
        return this.dataSource.query(`
            SELECT apointement, COUNT(*) 
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY apointement;
        `);
    }

    presencePieAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT apointement, COUNT(*) 
            FROM apointements WHERE 
            code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY apointement;
        `);
    }

    // Recrutements
    // Total recrues
    recrutementsTotalMonth(code_entreprise) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM postes WHERE 
            code_entreprise='${code_entreprise}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    recrutementsTotalYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM postes WHERE 
            code_entreprise='${code_entreprise}' AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    recrutementsTotalAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM postes WHERE 
            code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    postulantsTotalMonth(code_entreprise) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM candidatures WHERE 
            statut='Postulant' AND
            code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    postulantsTotalYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM candidatures WHERE 
            statut='Postulant' AND
            code_entreprise='${code_entreprise}'AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    postulantsTotalAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM candidatures WHERE 
            statut='Postulant' AND
            code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    postulantsRetenuTotalMonth(code_entreprise) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM candidatures WHERE 
            statut='Recrue' AND
            code_entreprise='${code_entreprise}' AND
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    postulantsRetenuTotalYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM candidatures WHERE 
            statut='Recrue' AND
            code_entreprise='${code_entreprise}'AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    postulantsRetenuTotalAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COUNT(*) 
            FROM candidatures WHERE 
            statut='Recrue' AND
            code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }


}
