import { Exclude } from "class-transformer";
import { Apointement } from "src/apointement/models/apointement.entity";
import { AvanceSalaire } from "src/avance-salaire/models/avance-salaire.entity";
import { DecimalTransformer } from "src/decimal.transformer";
import { HeureSupp } from "src/heures-supp/models/heures-supp.entity";
import { Penalite } from "src/penalite/models/pernalite.entity";
import { Prime } from "src/prime/models/prime.entity";
import { Salaire } from "src/salaires/models/salaire.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    nbr_enfants: number;
    
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
    @Column({nullable: true})
    departement: string;

    @Column({nullable: true})
    title: string;

    @Column({nullable: true})  // Ex: Directeur 
    fonction: string;

    @Column({nullable: true}) // Ex: 
    services: string; // RH

    @Column({nullable: true})
    site_location: string; // Site de travail
  
    // Contrat
    @Column({nullable: true})
    type_contrat: string;

    @Column({nullable: true})
    date_debut_contrat: Date;

    @Column({nullable: true})
    date_fin_contrat: Date; 
   
    // Salaire de base
    @Column({default: '0'})
    salaire_base: string;

    @Column({default: '0'})
    alloc_logement: string;

    @Column({default: '0'})
    alloc_transport: string;

    @Column({default: '0'})
    alloc_familliale: string;

    @Column({nullable: true}) //   Salaire de Base
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