import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('site_locations')
export class SiteLocation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    name: string; // Nom du site

    @Column()
    manager: string;

    @Column()
    adresse: string;

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