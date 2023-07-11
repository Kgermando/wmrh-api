import { IsEmail, IsNotEmpty } from "class-validator";
import { Apointement } from "src/apointement/models/apointement.entity";

export class RegisterDto {
   
    photo: string;  

    @IsNotEmpty()
    nom: string;

    @IsNotEmpty()
    postnom: string;

    @IsNotEmpty()
    prenom: string;

    @IsNotEmpty() 
    email: string;

    @IsNotEmpty()
    telephone: string;

    @IsNotEmpty()
    adresse: string;

    @IsNotEmpty()
    sexe: string;

 
    date_naissance: Date;
   
 
    lieu_naissance: string;

 
    nationalite: string;

 
    etat_civile: string;

 
    nbr_enfant: string;

 
    nbr_dependants: string;

 
    nbr_dependants_max: string;
      
    @IsNotEmpty()
    matricule: string;

 
    numero_cnss: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    role: string;  
   
 
    departement: string;

 
    title: string;

  
    fonction: string;

 
    services: string; 

 
    site_location: string;  
  
 
    type_contrat: string;

 
    date_debut_contrat: Date;

 
    date_fin_contrat: Date;
   
 
    salaire: string;

 
    compte_bancaire: string;

 
    nom_banque: string;

 
    frais_bancaire: string; 

 
    statut_personnel: boolean;

 
    cv_url: string;  

    @IsNotEmpty()
    signature: string;  

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created : Date;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    password_confirm: string; 

    presences: Apointement[];
 
    syndicat: boolean; 
    
    @IsNotEmpty()
    entreprise: string;
    
    @IsNotEmpty()
    code_entreprise: string;
}