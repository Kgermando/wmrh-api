import { IsEmail, IsNotEmpty } from "class-validator";

export class PosteCreateDto {

    @IsNotEmpty()
    search_profil: string;  

    @IsNotEmpty()
    sexe: string;

    @IsNotEmpty()
    salaire: string;

    @IsNotEmpty()
    type_contrat: string;

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