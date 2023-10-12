import { IsNotEmpty } from "class-validator";
import { Corporate } from "src/corporate/models/corporate.entity";
import { Personnel } from "src/personnel/models/personnel.entity";

export class PrimeCreateDto {

    @IsNotEmpty()
    corporate: Corporate;

    @IsNotEmpty()
    personnel: Personnel;

    @IsNotEmpty()
    intitule: string; 

    @IsNotEmpty()
    monnaie: string;

    @IsNotEmpty()
    montant: string;  

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