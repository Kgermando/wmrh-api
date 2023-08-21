import { IsNotEmpty } from "class-validator";

export class PreferenceCreateDto {
   
    @IsNotEmpty()
    logo: string;

    @IsNotEmpty()
    company_name: string;

    @IsNotEmpty()
    nbr_employe: number; 

    @IsNotEmpty()
    cnss: string;

    // @IsNotEmpty()
    // numero_taxe: string;

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

    // Impôt societe
    @IsNotEmpty()
    cnss_qpp : string;

    @IsNotEmpty()
    inpp : string;

    @IsNotEmpty()
    onem : string;

    // Parametre de deduction
    @IsNotEmpty()
    cotisation_syndicale : string;

    @IsNotEmpty()
    cnss_qpo : string;

    @IsNotEmpty()
    smig: string;

    // Taux
    @IsNotEmpty()
    monnaie : string;

    @IsNotEmpty()
    nbre_heure_travail : number;

    @IsNotEmpty()
    taux_dollard : number;

    @IsNotEmpty()
    prise_en_charge_frais_bancaire : boolean;

    @IsNotEmpty()
    courses_transport: number;

    @IsNotEmpty()
    montant_travailler_quadre : string;

    @IsNotEmpty()
    montant_travailler_non_quadre : string;

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

    // Anciennete
    @IsNotEmpty()
    prime_ancien_0: number;

    @IsNotEmpty()
    prime_ancien_5: number;

    @IsNotEmpty()
    prime_ancien_10: number;

    @IsNotEmpty()
    prime_ancien_15: number;

    @IsNotEmpty()
    prime_ancien_20: number;

    @IsNotEmpty()
    prime_ancien_25: number;

    // IPR barèmes
    @IsNotEmpty()
    bareme_3: number;

    @IsNotEmpty()
    bareme_15: number;

    @IsNotEmpty()
    bareme_30: number;

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