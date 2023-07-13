import { Exclude } from "class-transformer";
import { Apointement } from "src/apointement/models/apointement.entity";
import { AvanceSalaire } from "src/avance-salaire/models/avance-salaire.entity";
import { HeureSupp } from "src/heures-supp/models/heures-supp.entity";
import { Penalite } from "src/penalite/models/pernalite.entity";
import { Prime } from "src/prime/models/prime.entity";
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

    @Column({nullable: true})
    nbr_enfant: string;

    @Column({nullable: true})
    nbr_dependants: string;

    @Column({nullable: true})
    nbr_dependants_max: string;
     
    // Accès
    @Column({unique : true})
    matricule: string;

    @Column({nullable: true})
    numero_cnss: string;

    @Column({default: 'Manoeuvres Ordinaires (MO)'})
    category: string;

    @Column()
    role: number; // droit d'acces au logiciel de 0 à 5
  
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
   
    // Salaire
    @Column({nullable: true})
    salaire: string;

    @Column({nullable: true}) //   Salaire de Base
    compte_bancaire: string;

    @Column({nullable: true})
    nom_banque: string;

    @Column({nullable: true})
    frais_bancaire: string;  // Frais de compte
 
    // Profil
    @Column({nullable: true})
    statut_personnel: boolean;

    @Column({nullable: true})
    cv_url: string; // CV scan 

    @Column()
    @Exclude()
    password: string;

    @Column({default: false})
    syndicat: boolean; 

    @OneToMany(() => Apointement, (item) => item.personnel, {nullable: false})
    presences: Apointement[];

    @OneToMany(() => Prime, (item) => item.personnel, {nullable: false})
    primes: Prime[];

    @OneToMany(() => Penalite, (item) => item.personnel, {nullable: false})
    penalites: Penalite[];

    @OneToMany(() => AvanceSalaire, (item) => item.personnel, {nullable: false})
    avances_salaires: AvanceSalaire[];

    @OneToMany(() => HeureSupp, (item) => item.personnel, {nullable: false})
    heures_supp: HeureSupp[]; 
   
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