import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('postes')
export class Poste {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    search_profil: string; // Profil rechercher

    @Column()
    sexe: string;  // Homme, Femme, les deux

    @Column() 
    salaire: string; // Facultatif

    @Column()
    type_contrat: string;  

    @Column()
    statut: boolean;  // Offre disponible True or false

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