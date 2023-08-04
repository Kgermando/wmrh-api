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
            sexe='Femme' AND  
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
            code_entreprise='${code_entreprise}' 
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
            code_entreprise='${code_entreprise}' 
            GROUP BY year;
        `);
    }

    

    // getPerformenceAll(code_entreprise) {
    //     return this.dataSource.query(`
    //       SELECT (
    //         (SELECT SUM(ponctualite) AS ponctualite 
    //         FROM performences WHERE 
    //             code_entreprise='1234' AND  
    //                     EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
    //         )  
    //         +
    //         (SELECT SUM(hospitalite) AS hospitalite 
    //         FROM performences WHERE 
    //             code_entreprise='1234' AND 
    //                     EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
    //                     EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
    //         )  
    //         +
    //         (SELECT SUM(travail) AS travail
    //         FROM performences WHERE 
    //         code_entreprise='1234' AND 
    //                     EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
    //                     EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
    //         )  
    //         ) AS total, 
            
    //         SUM(ponctualite) AS ponctualite, 
    //         SUM(hospitalite) AS hospitalite, 
    //         SUM(travail) AS travail, 
    //         EXTRACT(YEAR FROM "created" ::TIMESTAMP) as year
    //         FROM performences WHERE 
    //         code_entreprise='${code_entreprise}' 
    //         GROUP BY year; 
    //     `);
    // } 


    // Finances

    // Masse salarial

    async masseSalarialMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(net_a_payer ::FLOAT), 0) as net_a_payer
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async masseSalarialMonthPrecedement(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(net_a_payer ::FLOAT), 0) as net_a_payer
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) - 1 AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async masseSalarialYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(net_a_payer ::FLOAT), 0) as net_a_payer
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async masseSalarialYearPrecedement(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(net_a_payer ::FLOAT), 0) as net_a_payer
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 1;
        `);
    }

    async masseSalarialAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(net_a_payer ::FLOAT), 0) as net_a_payer
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    // Statut de paie disponible et traitement
    async statutPaieMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT statut, COUNT(statut) 
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
         GROUP BY statut;
        `);
    }

    async statutPaieYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT statut, COUNT(statut) 
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY statut;
        `);
    }

    async statutPaieAll(code_entreprise) {
        return this.dataSource.query(`
        SELECT statut, COUNT(statut) 
        FROM salaires WHERE code_entreprise='${code_entreprise}'  AND  
        EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
        BETWEEN
        EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
        EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
        GROUP BY statut;
        `);
    } 


    // Alocations logement, transport, famillial, soins medicaux
    allocationMonth(code_entreprise) {
        return this.dataSource.query(`
        SELECT SUM(alloc_logement ::FLOAT) AS logement, 
            SUM(alloc_transport ::FLOAT) AS transport, 
            SUM(alloc_familliale ::FLOAT) AS familliale,
            SUM(soins_medicaux ::FLOAT) AS soins_medicaux, 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) as month
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY month;
        `);
    }

    allocationYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT SUM(alloc_logement ::FLOAT) AS logement, 
            SUM(alloc_transport ::FLOAT) AS transport, 
            SUM(alloc_familliale ::FLOAT) AS familliale,
            SUM(soins_medicaux ::FLOAT) AS soins_medicaux, 
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) as year
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' 
            GROUP BY year;
        `);
    }

    allocationALl(code_entreprise) {
        return this.dataSource.query(`
        SELECT SUM(alloc_logement ::FLOAT) AS logement, 
            SUM(alloc_transport ::FLOAT) AS transport, 
            SUM(alloc_familliale ::FLOAT) AS familliale,
            SUM(soins_medicaux ::FLOAT) AS soins_medicaux, 
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) as year_ans
            FROM salaires WHERE 
            code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP)
            GROUP BY year_ans;
        `);
    }


    async primesMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(primes ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async primeAncienneteMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(prime_anciennete ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async penaliteMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(penalites ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async avanceSalaireMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(avance_slaire ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async presEntrepriseMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(pres_entreprise ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async heureSuppMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(heure_supplementaire_monnaie ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async syndicatMonth(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(syndicat ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `); 
    }

 

    async primesYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(primes ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async primeAncienneteYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(prime_anciennete ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async penaliteYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(penalites ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async avanceSalaireYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(avance_slaire ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async presEntrepriseYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(pres_entreprise ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async heureSuppYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(heure_supplementaire_monnaie ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async syndicatYear(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(syndicat ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `); 
    }



    async primesAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(primes ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async primeAncienneteAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(prime_anciennete ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async penaliteAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(penalites ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async avanceSalaireAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(avance_slaire ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async presEntrepriseAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(pres_entreprise ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async heureSuppAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(heure_supplementaire_monnaie ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) 
            BETWEEN
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) - 10 AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    async syndicatAll(code_entreprise) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(syndicat ::FLOAT), 0) as total
            FROM salaires WHERE code_entreprise='${code_entreprise}' AND  
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
            statut='Recrue' AND
            code_entreprise='${code_entreprise}' AND 
            EXTRACT(MONTH FROM "created" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    postulantsTotalYear(code_entreprise) {
        return this.dataSource.query(`
        SELECT COUNT(*) 
            FROM candidatures WHERE 
            statut='Recrue' AND
            code_entreprise='${code_entreprise}'AND
            EXTRACT(YEAR FROM "created" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP);
        `);
    }

    postulantsTotalAll(code_entreprise) {
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
