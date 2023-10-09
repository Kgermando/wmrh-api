import { Personnel } from "src/personnel/models/personnel.entity";
import { Corporate } from "src/corporate/models/corporate.entity";
import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('service_prefs')
export class ServicePref {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    service: string;

    @OneToMany(() => Personnel, (item) => item.services, {cascade: true})
    personnels: Personnel[];

    @ManyToOne(() => Corporate, (co)=> co.services, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
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