import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('fonctions')
export class Fonction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()    
    fonction: string;

    @OneToMany(() => Personnel, (item) => item.fonction, {cascade: true})
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