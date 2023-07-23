import { DecimalTransformer } from "src/decimal.transformer";
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

    // Impôt societe
    @Column({default: '0'})
    cnss_qpp : string;

    @Column({default: '0'})
    inpp : string;

    @Column({default: '0'})
    onem : string;

    // Parametre de deduction
    @Column({default: '0'})
    cotisation_syndicale : string;

    @Column({default: '0'})
    cnss_qpo : string;

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

    // Categories
    @Column({default: '0'})
    categorie_mo: string;

    @Column({default: '0'})
    categorie_ts: string;

    @Column({default: '0'})
    categorie_tsq: string;

    @Column({default: '0'})
    categorie_tq: string;

    @Column({default: '0'})
    categorie_thq: string;

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