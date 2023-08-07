import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('departements')
export class Departement {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    departement: string; // Entreprise

    @OneToMany(() => Personnel, (item) => item.departement, {cascade: true})
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