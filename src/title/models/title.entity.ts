import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('titles')
export class Title {

    @PrimaryGeneratedColumn()
    id: number;

    title: string;

    @OneToMany(() => Personnel, (item) => item.title, {cascade: true})
    personnels: Personnel[];  

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