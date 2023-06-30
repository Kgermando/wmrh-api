import { IsEmail, IsNotEmpty, isEmail } from "class-validator";

export class PreferenceCreateDto {
   
    @IsNotEmpty()
    company_name: string;  

    @IsNotEmpty()
    nbr_employe: string;

    @IsNotEmpty()
    cnss: string; 

    @IsNotEmpty() 
    numero_taxe: string;

    @IsNotEmpty()
    rccm: string;

    @IsNotEmpty()
    id_nat: string;

    @IsNotEmpty()
    numero_impot: string;

    @IsNotEmpty() 
    email: string;

    @IsNotEmpty()
    telephone: string;

    @IsNotEmpty()
    adresse: string;

    @IsNotEmpty()
    date_paie: Date;

    @IsNotEmpty()
    cnss_qpp: string;

    @IsNotEmpty()
    inpp: string;

    @IsNotEmpty()
    cotisation_syndicale: string;
        
    @IsNotEmpty()
    cnss_qpo: string;

    @IsNotEmpty()
    allocation_logement: string;

    @IsNotEmpty()
    allocation_transport: string;  

    @IsNotEmpty()
    nbr_max_enfant_courvert: string;

    @IsNotEmpty()
    allocation_familliale: string;

    @IsNotEmpty()
    allocation_epouse: string;

    @IsNotEmpty()
    nbre_heure_travail: string;

    @IsNotEmpty()
    taux_dollard: string;  

    @IsNotEmpty()
    new_year: Date;

    @IsNotEmpty()
    noel: Date;

    @IsNotEmpty()
    martyr_day: Date;

    @IsNotEmpty()
    kabila_day: Date;

    @IsNotEmpty()
    lumumba_day: Date;

    @IsNotEmpty()
    labour_day: Date;

    @IsNotEmpty()
    liberation_day: Date; 

    @IsNotEmpty()
    indepence_day: Date;

    @IsNotEmpty()
    parent_day: Date;

    @IsNotEmpty()
    kimbangu_day: Date;

    @IsNotEmpty()
    signature: string;  

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created : Date;

    @IsNotEmpty()
    entreprise: string;
    
    @IsNotEmpty()
    code_entreprise: string;

    @IsNotEmpty()
    responsable: string;
}