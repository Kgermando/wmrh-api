import { IsEmail, IsNotEmpty } from "class-validator";

export class ServicePrefCreateDto {
   
    @IsNotEmpty()
    services: string;   

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