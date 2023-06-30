import { IsEmail, IsNotEmpty } from "class-validator";

export class FonctionCreateDto {
   
    @IsNotEmpty()
    fonction: string;   

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