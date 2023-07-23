import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('heures_supp')
export class HeureSupp {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    motif: string; // Tavaills effectues ou tâches

    @Column()
    nbr_heures: number;

    @ManyToOne(() => Personnel, (personnel)=> personnel.heures_supp, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
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