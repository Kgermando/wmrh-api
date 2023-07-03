import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('departements')
export class Departement {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    departement: string; // Entreprise

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