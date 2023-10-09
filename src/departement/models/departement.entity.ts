import { Personnel } from "src/personnel/models/personnel.entity";
import { Corporate } from "src/corporate/models/corporate.entity";
import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('departements')
export class Departement {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    departement: string; // Commercial

    @OneToMany(() => Personnel, (item) => item.departements, {cascade: true})
    personnels: Personnel[];

    @ManyToOne(() => Corporate, (co)=> co.departements, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    corporate: Corporate;

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