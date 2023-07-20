import { Apointement } from "src/apointement/models/apointement.entity";
import { AvanceSalaire } from "src/avance-salaire/models/avance-salaire.entity";
import { Penalite } from "src/penalite/models/pernalite.entity";
import { Prime } from "src/prime/models/prime.entity";
import { Salaire } from "src/salaires/models/salaire.entity";

export class PersonnelUpdateDto {

    photo?: string; 

    nom?: string; 

    postnom?: string; 

    prenom?: string;

    email?: string;

    telephone?: string; 

    adresse?: string; 

    sexe?: string; 

    date_naissance?: Date; 

    lieu_naissance?: string; 

    nationalite?: string; 

    etat_civile?: string; 

    nbr_enfants?: number;  

    matricule?: string; 

    numero_cnss?: string;

    category?: string;

    statut_personnel?: boolean; 

    role?: number;
    
    permission?: string; 

    departement?: string; 

    title?: string; 

    fonction?: string; 

    services?: string; 

    site_location?: string; 

    type_contrat?: string; 

    date_debut_contrat?: Date;


    date_fin_contrat?: Date; 

    salaire?: string; 

    compte_bancaire?: string; 

    nom_banque?: string; 

    frais_bancaire?: string;  

    cv_url?: string;  

    syndicat?: boolean; 

    is_paie?: number;

    presences?: Apointement [];

    primes?: Prime[];

    penalites?: Penalite[];

    avances_salaires?: AvanceSalaire[];

    heures_supp: AvanceSalaire[];

    salaires?: Salaire[];
    

    signature?: string; 

    created?: Date; 

    update_created?: Date; 
    
    entreprise?: string;
     
    code_entreprise?: string;
}