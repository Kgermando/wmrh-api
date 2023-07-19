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
    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    cnss_qpp : string;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    inpp : string;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    onem : string;

    // Parametre de deduction
    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    cotisation_syndicale : string;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
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
    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    categorie_mo: string;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    categorie_ts: string;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    categorie_tsq: string;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    categorie_tq: string;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    categorie_thq: string;

    @Column()
    nbr_course: number;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    contre_valeur_logement: string;

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