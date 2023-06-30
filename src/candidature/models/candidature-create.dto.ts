import { IsEmail, IsNotEmpty } from "class-validator";

export class CandidatureCreateDto {
   
    @IsNotEmpty()
    post_id: number;  

    @IsNotEmpty()
    scanUrl: string;

    @IsNotEmpty()
    full_name: string;

    @IsNotEmpty()
    sexe: string; 

    @IsNotEmpty()
    departement: string; 

    @IsNotEmpty()
    statut: boolean;

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