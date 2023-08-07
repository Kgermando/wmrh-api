import { Exclude } from "class-transformer";
import { Apointement } from "src/apointement/models/apointement.entity";
import { AvanceSalaire } from "src/avance-salaire/models/avance-salaire.entity"; 
import { Departement } from "src/departement/models/departement.entity";
import { Fonction } from "src/fonction/models/fonction.entity";
import { HeureSupp } from "src/heures-supp/models/heures-supp.entity";
import { Penalite } from "src/penalite/models/pernalite.entity";
import { Performence } from "src/performence/models/performence.entity";
import { PresEntreprise } from "src/pres-entreprise/models/pres-entreprise.entity";
import { Prime } from "src/prime/models/prime.entity";
import { Salaire } from "src/salaires/models/salaire.entity";
import { ServicePref } from "src/service-pref/models/service-pref.entity";
import { SiteLocation } from "src/site-location/models/site-location.entity";
import { Title } from "src/title/models/title.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('personnels')
export class Personnel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    photo: string;

    @Column()
    nom: string;

    @Column()
    postnom: string;

    @Column()
    prenom: string;

    @Column()
    email: string;

    @Column()
    telephone: string;

    @Column()
    adresse: string;

    @Column()
    sexe: string;

    @Column({nullable: true})
    date_naissance: Date;

    @Column({nullable: true})
    lieu_naissance: string;

    @Column({nullable: true})
    nationalite: string;

    @Column({nullable: true})
    etat_civile: string;

    @Column({default: 0})
    nbr_dependants: number; 
    
    // Accès
    @Column({unique : true})
    matricule: string;

    @Column({nullable: true})
    numero_cnss: string;

    @Column({nullable: true})
    category: string;

    @Column({default: false})
    statut_personnel: boolean;

    @Column({default: 5})
    role: number; // Show or Hide items can do 0 to 5
    
    @Column({nullable: true})
    permission: string;  // Give access to CRUD  [Create, Read, Update, Delete] C R U D
  


    // Travail
    @ManyToOne(() => Departement, (dep)=> dep.personnels, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    departement: Departement;

    @ManyToOne(() => Title, (tit)=> tit.personnels, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    title: Title;

    @ManyToOne(() => Fonction, (fonc)=> fonc.personnels, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    fonction: Fonction;

    @ManyToOne(() => ServicePref, (serv)=> serv.personnels, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    services: ServicePref; // caisse

    @ManyToOne(() => SiteLocation, (site)=> site.personnels, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    site_location: SiteLocation; // Site de travail


  
    // Contrat
    @Column({nullable: true})
    type_contrat: string;

    @Column({nullable: true})
    date_debut_contrat: Date;

    @Column({nullable: true})
    date_fin_contrat: Date; 

    @Column({default: 'CDF'})
    monnaie: string;
   
    

    @Column({default: '0'})
    alloc_logement: string;

    @Column({default: '0'})
    alloc_transport: string;

    @Column({default: '0'})
    alloc_familliale: string;

    @Column({default: '0'})
    soins_medicaux: string;

    // Salaire de base 
    @Column({default: '0'})
    salaire_base: string;

    @Column({nullable: true}) 
    compte_bancaire: string;

    @Column({nullable: true})
    nom_banque: string;

    @Column({nullable: true})
    frais_bancaire: string;  // Frais de compte
  

    @Column({nullable: true})
    cv_url: string; // CV scan 

    @Column()
    @Exclude()
    password: string;

    @Column({default: false})
    syndicat: boolean; 

    @Column({default: 0})
    is_paie: number; // Le  mois du bulletin deja généré

    @OneToMany(() => Apointement, (item) => item.personnel, {cascade: true})
    presences: Apointement[];

    @OneToMany(() => Prime, (item) => item.personnel, {cascade: true})
    primes: Prime[];

    @OneToMany(() => Penalite, (item) => item.personnel, {cascade: true})
    penalites: Penalite[];

    @OneToMany(() => AvanceSalaire, (item) => item.personnel, {cascade: true})
    avances_salaires: AvanceSalaire[];

    @OneToMany(() => HeureSupp, (item) => item.personnel, {cascade: true})
    heures_supp: HeureSupp[];

    @OneToMany(() => Salaire, (item) => item.personnel, {cascade: true})
    salaires: Salaire[];

    @OneToMany(() => Performence, (item) => item.personnel, {cascade: true})
    performences: Performence[];

    @OneToMany(() => PresEntreprise, (item) => item.personnel, {cascade: true})
    pres_entreprises: PresEntreprise[];
    
   
    @Column()
    signature: string; // celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created : Date; 

    @Column()
    entreprise: string;
    
    @Column()
    code_entreprise: string;

}