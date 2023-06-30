import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('candidatures')
export class Candidature {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    post_id: number;

    @Column()
    scanUrl: string;

    @Column()
    full_name: string;

    @Column()
    sexe: string;

    @Column()
    departement: string;

    @Column()
    statut: boolean;

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