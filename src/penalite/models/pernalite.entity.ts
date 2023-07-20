import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('penalites')
export class Penalite {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    intitule: string; // Santions ou fautes commise

    @Column()
    montant: string;

    @ManyToOne(() => Personnel, (personnel)=> personnel.penalites)
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