import { DecimalTransformer } from "src/decimal.transformer";
import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('salaires')
export class Salaire {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Personnel, (personnel)=> personnel.salaires)
    personnel: Personnel;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    alloc_logement: string;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    alloc_transport: string;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    alloc_familliale: string;
 
    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    salaire_base: string;  // Par jour 

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    primes: string;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    prime_anciennete: string;

    @Column({default: 0})
    heures_supp: number;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    conge_paye: string;

    @Column({default: 26})
    nbre_jrs_preste: number; // Nombre de jours presents

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    rbi: string;  // Remuneration brute imposable

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    cnss_qpo: string; // Impôt de 5% => 0.05

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    rni: string;  // Remuneration Nette Imposable

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    ipr: string;  // Impôt Professionnel sur les Rémunérations (IPR)

    
    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    syndicat: string;  // 1 % 
 
    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    penalites: string;  // Sanctions sur le salaire net à payer

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer})
    net_a_payer: string;

    @Column()
    statut: string; // Pending, Generated,

    @Column()    
    signature: string;

    @Column()
    created: Date;

    @Column()
    update_created: Date;

    @Column()
    entreprise: string;
    
    @Column()
    code_entreprise: string; 
}