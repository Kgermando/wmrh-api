import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('primes')
export class Prime {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    intitule: string; // Prime de travaill, prime de risque, ...

    @Column()
    montant: string;

    @ManyToOne(() => Personnel, (personnel)=> personnel.primes)
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