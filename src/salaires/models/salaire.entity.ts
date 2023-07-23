import { DecimalTransformer } from "src/decimal.transformer";
import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('salaires')
export class Salaire {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Personnel, (personnel)=> personnel.salaires, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    personnel: Personnel;

    @Column({default: 'CDF'})
    monnaie: string;

    @Column()
    taux_dollard: string;

    @Column({default: 0})
    nbr_dependants: number;

    @Column({default: '0'})
    alloc_logement: string;

    @Column({default: '0'})
    alloc_transport: string;

    @Column({default: '0'})
    alloc_familliale: string;
 
    @Column({default: '0'})
    salaire_base: string;  // Par jour 

    @Column({default: '0'})
    primes: string;

    @Column({default: '0'})
    prime_anciennete: string;

    @Column({default: 0})
    heures_supp: number;

    @Column({default: '0'})
    conge_paye: string;

    @Column({default: 26})
    nbre_jrs_preste: number; // Nombre de jours presents

    @Column({default: '0'})
    rbi: string;  // Remuneration brute imposable

    @Column({default: '0'})
    cnss_qpo: string; // Impôt de 5% => 0.05

    @Column({default: '0'})
    rni: string;  // Remuneration Nette Imposable

    @Column({default: '0'})
    ipr: string;  // Impôt Professionnel sur les Rémunérations (IPR)

    
    @Column({default: '0'})
    syndicat: string;  // 1 % 
 
    @Column({default: '0'})
    penalites: string;  // Sanctions sur le salaire net à payer

    @Column({default: '0'})
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