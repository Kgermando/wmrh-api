import { IsNotEmpty } from "class-validator";

export class PreferenceCreateDto {
   
    @IsNotEmpty()
    company_name: string;

    @IsNotEmpty()
    nbr_employe: number; 

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

    // Date de paie
    @IsNotEmpty()
    date_paie : Date;

    // Impot societe
    @IsNotEmpty()
    cnss_qpp : number;

    @IsNotEmpty()
    inpp : number;

    @IsNotEmpty()
    onem : number;

    // Parametre de deduction
    @IsNotEmpty()
    cotisation_syndicale : number;

    @IsNotEmpty()
    cnss_qpo : number;

    // Autres beneficiaires
    @IsNotEmpty()
    allocation_logement : number;

    @IsNotEmpty()
    allocation_transport : number; 

    @IsNotEmpty()
    nbr_max_enfant_courvert : number;

    @IsNotEmpty()
    allocation_familliale : number;

    @IsNotEmpty()
    allocation_epouse : number;

    // Taux
    @IsNotEmpty()
    monnaie : string;

    @IsNotEmpty()
    nbre_heure_travail : number;

    @IsNotEmpty()
    taux_dollard : number;

    // Jours feries
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
    prime_ancien_0: string;

    @IsNotEmpty()
    prime_ancien_5: string;

    @IsNotEmpty()
    prime_ancien_10: string;

    @IsNotEmpty()
    prime_ancien_15: string;

    @IsNotEmpty()
    prime_ancien_20: string;

    @IsNotEmpty()
    prime_ancien_25: string; 

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
}