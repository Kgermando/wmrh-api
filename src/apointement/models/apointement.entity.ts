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

    // @Column({default: false})
    // counter: boolean;

    // @Column()
    // presence: boolean; // True si la personne est entrée et False si a personne est sortie

    @Column()
    observation: string;

    @Column()
    date_entree: Date;

    @Column()
    date_sortie: Date;  

    @ManyToOne(() => Personnel, (personnel)=> personnel.presences)
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