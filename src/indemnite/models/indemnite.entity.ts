import { Corporate } from "src/corporate/models/corporate.entity";
import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('indemnites')
export class Indemnite {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Corporate, (co)=> co.indemnites, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    corporate: Corporate;

    @ManyToOne(() => Personnel, (co)=> co.indemnites, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    personnel: Personnel; 

    @Column({default: '-'})
    intitule: string;

    @Column({default: 'En attente'})
    statut: string;

    @Column({default: 'CDF'})
    monnaie: string;

    @Column({default: '0'})
    taux_dollard: string;

    @Column('jsonb', { nullable: false, default: {} })
    content: IndemniteContentModel;
 
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

export interface IndemniteContentModel {
    nom: string;
    montant: string;
}