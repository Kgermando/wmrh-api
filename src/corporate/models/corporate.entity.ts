import { Personnel } from "src/personnel/models/personnel.entity";
import { Entreprise } from "src/admin/entreprise/models/entreprise.entity";
import { Departement } from "src/departement/models/departement.entity";
import { Fonction } from "src/fonction/models/fonction.entity";
import { ServicePref } from "src/service-pref/models/service-pref.entity";
import { SiteLocation } from "src/site-location/models/site-location.entity";
import { Title } from "src/title/models/title.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Prime } from "src/prime/models/prime.entity";
import { Penalite } from "src/penalite/models/pernalite.entity";
import { AvanceSalaire } from "src/avance-salaire/models/avance-salaire.entity";
import { HeureSupp } from "src/heures-supp/models/heures-supp.entity";
import { Salaire } from "src/salaires/models/salaire.entity";
import { PresEntreprise } from "src/pres-entreprise/models/pres-entreprise.entity";
import { Performence } from "src/performence/models/performence.entity";
import { Apointement } from "src/apointement/models/apointement.entity";
import { Horaire } from "src/horaire/models/horaire.entity";
import { Indemnite } from "src/indemnite/models/indemnite.entity";

@Entity('corporate')
export class Corporate {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Entreprise, (co)=> co.corporates, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    entreprise_id: Entreprise;

    @OneToMany(() => Personnel, (item) => item.corporates, {cascade: true})
    personnels: Personnel[];

    @Column({default: '-'})
    logo: string;

    @Column()
    corporate_name: string; // Nom de la corporate

    @Column()
    statut: boolean;

    @Column()
    code_corporate: string;

    @Column({default: 0})
    nbre_employe: number;

    @Column({default: '-'})
    rccm: string;

    @Column({default: '-'})
    id_nat: string;

    @Column({default: '-'})
    numero_impot: string;

    @Column({default: '-'})
    numero_cnss: string;

    @Column({default: '-'})
    responsable: string;

    @Column()
    telephone: string;

    @Column()
    email: string;

    @Column()
    adresse: string;

    @OneToMany(() => Apointement, (item) => item.corporate, {cascade: true})
    presences: Apointement[];

    @OneToMany(() => Departement, (item) => item.corporate, {cascade: true})
    departements: Departement[];

    @OneToMany(() => SiteLocation, (item) => item.corporate, {cascade: true})
    site_locations: SiteLocation[];

    @OneToMany(() => ServicePref, (item) => item.corporate, {cascade: true})
    services: ServicePref[];

    @OneToMany(() => Fonction, (item) => item.corporate, {cascade: true})
    fonctions: Fonction[];

    @OneToMany(() => Title, (item) => item.corporate, {cascade: true})
    titles: Title[];

    @OneToMany(() => Prime, (item) => item.corporate, {cascade: true})
    primes: Prime[];

    @OneToMany(() => Penalite, (item) => item.corporate, {cascade: true})
    penalites: Penalite[];

    @OneToMany(() => AvanceSalaire, (item) => item.corporate, {cascade: true})
    avances_salaires: AvanceSalaire[];

    @OneToMany(() => HeureSupp, (item) => item.corporate, {cascade: true})
    heures_supp: HeureSupp[];

    @OneToMany(() => Salaire, (item) => item.corporate, {cascade: true})
    salaires: Salaire[];

    @OneToMany(() => Performence, (item) => item.corporate, {cascade: true})
    performences: Performence[];

    @OneToMany(() => PresEntreprise, (item) => item.corporate, {cascade: true})
    pres_entreprises: PresEntreprise[];

    @OneToMany(() => Horaire, (item) => item.corporate, {cascade: true})
    horaires: Horaire[];

    @OneToMany(() => Indemnite, (item) => item.corporate, {cascade: true})
    indemnites: Indemnite[];

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