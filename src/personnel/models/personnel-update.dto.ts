import { Title } from "aws-sdk/clients/codecommit";
import { Apointement } from "src/apointement/models/apointement.entity";
import { AvanceSalaire } from "src/avance-salaire/models/avance-salaire.entity";
import { Departement } from "src/departement/models/departement.entity";
import { Fonction } from "src/fonction/models/fonction.entity";
import { Penalite } from "src/penalite/models/pernalite.entity";
import { Performence } from "src/performence/models/performence.entity";
import { PresEntreprise } from "src/pres-entreprise/models/pres-entreprise.entity";
import { Prime } from "src/prime/models/prime.entity";
import { Salaire } from "src/salaires/models/salaire.entity";
import { ServicePref } from "src/service-pref/models/service-pref.entity";
import { SiteLocation } from "src/site-location/models/site-location.entity";

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

    nbr_dependants?: number;  

    matricule?: string; 

    numero_cnss?: string;

    category?: string;

    statut_personnel?: boolean; 

    role?: number;
    
    permission?: string; 

    departement?: Departement; 

    title?: Title;

    fonction?: Fonction; 

    services?: ServicePref; 

    site_location?: SiteLocation; 

    type_contrat?: string; 

    date_debut_contrat?: Date; 

    date_fin_contrat?: Date; 

    monnaie?: string; 

    alloc_logement?: string;
 
    alloc_transport?: string;
 
    alloc_familliale?: string;

    soins_medicaux?: string;

    salaire_base?: string;

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

    performences?: Performence[];

    pres_entreprises?: PresEntreprise[];
    

    signature?: string; 

    created?: Date; 

    update_created: Date; 
    
    entreprise?: string;
     
    code_entreprise?: string;
}