import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('titles')
export class Title {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string; // exemple: Directeur

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