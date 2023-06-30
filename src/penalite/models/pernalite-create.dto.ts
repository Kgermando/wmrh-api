import { IsNotEmpty } from "class-validator";

export class PenaliteCreateDto { 
    @IsNotEmpty()
    user_id: string;

    @IsNotEmpty()
    observation: string; 

    @IsNotEmpty()
    montant: number; 

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

    @IsNotEmpty()
    responsable: string;
}