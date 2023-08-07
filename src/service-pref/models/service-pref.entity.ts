import { Personnel } from "src/personnel/models/personnel.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('service_prefs')
export class ServicePref {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    service: string;

    @OneToMany(() => Personnel, (item) => item.services, {cascade: true})
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