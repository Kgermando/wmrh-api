import { Apointement } from "src/apointement/models/apointement.entity";
import { AvanceSalaire } from "src/avance-salaire/models/avance-salaire.entity";
import { Penalite } from "src/penalite/models/pernalite.entity";
import { Prime } from "src/prime/models/prime.entity";

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

    nbr_enfant?: string; 

    nbr_dependants?: string; 

    nbr_dependants_max?: string; 

    matricule?: string; 

    numero_cnss?: string;

    category?: string;  

    role?: number; 

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

    statut_personnel?: boolean; 

    cv_url?: string; 

    syndicat?: boolean; 

    presences?: Apointement [];

    primes?: Prime[];

    penalites?: Penalite[];

    avances_salaires?: AvanceSalaire[];  

    signature?: string; 

    created?: Date; 

    update_created?: Date; 
    
    entreprise?: string;
     
    code_entreprise?: string;
}