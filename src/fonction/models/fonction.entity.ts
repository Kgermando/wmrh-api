import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('fonctions')
export class Fonction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fonction: string;

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