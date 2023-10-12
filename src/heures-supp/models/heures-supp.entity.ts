import { Corporate } from "src/corporate/models/corporate.entity";
import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('heures_supp')
export class HeureSupp {

    @ManyToOne(() => Corporate, (co)=> co.heures_supp, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    corporate: Corporate;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    motif: string; // Tavaills effectues ou tâches

    @Column()
    nbr_heures: number;

    @ManyToOne(() => Personnel, (personnel)=> personnel.heures_supp, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    personnel: Personnel;

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