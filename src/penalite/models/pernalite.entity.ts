import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('primes')
export class Penalite {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: string;

    @Column()
    observation: string; // Prime de travaill, prime ...

    @Column()
    montant: number;

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

    @Column()
    responsable: string;
}