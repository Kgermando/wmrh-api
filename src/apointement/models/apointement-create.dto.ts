import { IsEmail, IsNotEmpty } from "class-validator";

export class ApointementCreateDto {
   
    @IsNotEmpty()
    matricule: string;  

    @IsNotEmpty()
    apointement: string;

    @IsNotEmpty()
    date_entree: Date;

    @IsNotEmpty()
    date_sortie: Date;

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