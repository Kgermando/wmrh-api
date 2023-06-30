import { IsEmail, IsNotEmpty } from "class-validator";

export class SiteLocationCreateDto {
   
    @IsNotEmpty()
    name: string;  

    @IsNotEmpty()
    manager: string;

    @IsNotEmpty()
    adresse: string; 
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