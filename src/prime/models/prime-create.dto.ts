import { IsNotEmpty } from "class-validator";
import { Personnel } from "src/personnel/models/personnel.entity";

export class PrimeCreateDto {

    @IsNotEmpty()
    intitule: string; 

    @IsNotEmpty()
    montant: string; 

    @IsNotEmpty()
    personnel: Personnel;

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