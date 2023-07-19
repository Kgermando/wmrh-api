import { IsNotEmpty } from "class-validator";
import { Personnel } from "src/personnel/models/personnel.entity";

export class SalaireCreateDto {

    @IsNotEmpty()
    personnel: Personnel;

    @IsNotEmpty()
    alloc_logement: string;

    @IsNotEmpty()
    alloc_transport: string;

    @IsNotEmpty()
    alloc_familliale: string;
 
    @IsNotEmpty()
    salaire_base: string;  // Par jour 

    @IsNotEmpty()
    primes: string;

    @IsNotEmpty()
    prime_anciennete: string;

    @IsNotEmpty()
    heures_supp: number;

    @IsNotEmpty()
    conge_paye: string;

    @IsNotEmpty()
    nbre_jrs_preste: number; // Nombre de jours presents

    @IsNotEmpty()
    rbi: string;  // Remuneration brute imposable

    @IsNotEmpty()
    cnssQPO: string; // Impôt de 5% => 0.05

    @IsNotEmpty()
    rni: string;  // Remuneration Nette Imposable

    @IsNotEmpty()
    ipr: string;  // Impôt Professionnel sur les Rémunérations (IPR)

    @IsNotEmpty()
    syncdicat: string;  // 1 % 
 
    @IsNotEmpty()
    penalites: string;  // Sanctions sur le salaire net à payer

    @IsNotEmpty()
    net_a_payer: string;

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