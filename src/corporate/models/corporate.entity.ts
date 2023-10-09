import { Personnel } from "src/personnel/models/personnel.entity";
import { Entreprise } from "src/admin/entreprise/models/entreprise.entity";
import { Departement } from "src/departement/models/departement.entity";
import { Fonction } from "src/fonction/models/fonction.entity";
import { ServicePref } from "src/service-pref/models/service-pref.entity";
import { SiteLocation } from "src/site-location/models/site-location.entity";
import { Title } from "src/title/models/title.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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