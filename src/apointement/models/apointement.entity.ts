import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('apointements')
export class Apointement {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    matricule: string;

    @Column()
    apointement: string; 

    @Column()
    observation: string;

    @Column()
    date_entree: Date;

    @Column()
    date_sortie: Date;  

    @ManyToOne(() => Personnel, (personnel)=> personnel.presences, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
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