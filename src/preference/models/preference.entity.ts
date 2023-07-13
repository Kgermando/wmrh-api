import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('preferences')
export class Preference {

    @PrimaryGeneratedColumn()
    id: number;  
    
    // Infos entreprise 
    @Column()
    company_name: string;

    @Column()
    nbr_employe: number; 

    @Column()
    cnss: string;

    @Column()
    numero_taxe: string;

    @Column()
    rccm: string;

    @Column()
    id_nat: string;

    @Column()
    numero_impot: string;

    @Column()
    email: string;

    @Column()
    telephone: string;

    @Column()
    adresse: string;

    // Date de paie
    @Column()
    date_paie : Date;

    // Impot societe
    @Column()
    cnss_qpp : number;

    @Column()
    inpp : number;

    @Column()
    onem : number;

    // Parametre de deduction
    @Column()
    cotisation_syndicale : number;

    @Column()
    cnss_qpo : number;

    // Autres beneficiaires
    @Column()
    allocation_logement : number;

    @Column()
    allocation_transport : number; 

    @Column()
    nbr_max_enfant_courvert : number;

    @Column()
    allocation_familliale : number;

    @Column()
    allocation_epouse : number;

    // Taux
    @Column()
    monnaie : string;

    @Column()
    nbre_heure_travail : number;

    @Column()
    taux_dollard : number;

    // Jours feries
    @Column()
    new_year: Date;

    @Column()
    noel: Date;

    @Column()
    martyr_day: Date;

    @Column()
    kabila_day: Date;

    @Column()
    lumumba_day: Date;

    @Column()
    labour_day: Date;

    @Column()
    liberation_day: Date;

    @Column()
    indepence_day: Date;

    @Column()
    parent_day: Date;

    @Column()
    kimbangu_day: Date;

    // Anciennete
    @Column()
    prime_ancien_0: number;

    @Column()
    prime_ancien_5: number;

    @Column()
    prime_ancien_10: number;

    @Column()
    prime_ancien_15: number;

    @Column()
    prime_ancien_20: number;

    @Column()
    prime_ancien_25: number;

    @Column()
    signature: string;

    @Column()
    created: Date;

    @Column()
    update_created : Date;

    @Column()
    entreprise: string;
    
    @Column()
    code_entreprise: string;

}