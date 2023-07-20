import { IsNotEmpty } from "class-validator";
import { Personnel } from "src/personnel/models/personnel.entity";

export class SalaireCreateDto {

    @IsNotEmpty()
    personnel: Personnel;

    monnaie: string;

 
    alloc_logement: string;

 
    alloc_transport: string;

 
    alloc_familliale: string;
 
 
    salaire_base: string;  // Par jour 

 
    primes: string;

 
    prime_anciennete: string;

 
    heures_supp: number;

 
    conge_paye: string;

 
    nbre_jrs_preste: number; // Nombre de jours presents

 
    rbi: string;  // Remuneration brute imposable

 
    cnssQPO: string; // Impôt de 5% => 0.05

 
    rni: string;  // Remuneration Nette Imposable
 
    ipr: string;  // Impôt Professionnel sur les Rémunérations (IPR)

 
    syndicat: string;  // 1 % 
 
 
    penalites: string;  // Sanctions sur le salaire net à payer

     
    net_a_payer: string;

    @IsNotEmpty()
    statut: string; // Pending, Generated

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created : Date;

    @IsNotEmpty()
    entreprise: string;
    
    @IsNotEmpty()
    code_entreprise: string; 
}