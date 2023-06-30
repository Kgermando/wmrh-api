import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('service_prefs')
export class ServicePref {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    services: string;

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