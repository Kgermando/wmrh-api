import { Corporate } from "src/corporate/models/corporate.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('corporate_reglages')
export class CorporateReglage {

    @PrimaryGeneratedColumn()
    id: number;  
    
    // Infos Corporate 
    @OneToOne(() => Corporate)
    @JoinColumn()
    company: Corporate;

    // Date de paie
    @Column()
    date_paie : Date;

    // Impôt societe
    @Column({default: '13'})
    cnss_qpp : string;

    @Column({default: '0'})
    inpp : string;

    @Column({default: '0'})
    onem : string;

    // Parametre de deduction
    @Column({default: '1'})
    cotisation_syndicale : string;

    @Column({default: '5'})
    cnss_qpo : string;

    @Column({default: '262'})
    smig: string;

    // Taux
    // @Column()
    // monnaie : string;

    @Column({default: 6})
    nbre_heure_travail : number;

    @Column()
    taux_dollard : number;

    @Column({default: false})
    prise_en_charge_frais_bancaire : boolean;

    @Column({default: 6})
    courses_transport : number;

    @Column({default: '0'})
    montant_travailler_quadre : string;

    @Column({default: '0'})
    montant_travailler_non_quadre : string;

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

    // IPR barèmes
    @Column({default: 0})
    bareme_3: number;

    @Column({default: 0})
    bareme_15: number;

    @Column({default: 0})
    bareme_30: number;

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