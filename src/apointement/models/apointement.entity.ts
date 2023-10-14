import { Corporate } from "src/corporate/models/corporate.entity";
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

    @Column({default: '1'})
    prestation: string;

    @Column()
    observation: string;

    @Column()
    date_entree: Date;

    @Column()
    date_sortie: Date;  

    @ManyToOne(() => Personnel, (personnel)=> personnel.presences, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    personnel: Personnel;

    @ManyToOne(() => Corporate, (corporate)=> corporate.presences, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    corporate: Corporate;

    @Column({default: 'ALL'})   
    site_location: string;

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