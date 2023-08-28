import { AbonnementClient } from "src/admin/abonnement_client/models/abonnement_client.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('entreprises')
export class Entreprise {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    company_name: string;

    @Column()
    rccm: string;

    @Column()
    id_nat: string;

    @Column()
    responsable: string;

    @Column()
    telephone: string;

    @Column()
    email: string;

    @Column()
    adresse: string;

    @Column()
    code_entreprise: string;

    @Column({default: 0})
    nbre_employe: number;

    @Column({default: false})
    statut: boolean; // statut abonnement

    @OneToMany(() => AbonnementClient, (item) => item.entreprise, {cascade: true})
    abonnements: AbonnementClient[];

    @Column()
    signature: string;

    @Column()
    created: Date;

    @Column()
    update_created: Date;

}