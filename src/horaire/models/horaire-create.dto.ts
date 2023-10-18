import { IsNotEmpty } from "class-validator"; 
import { Corporate } from "src/corporate/models/corporate.entity";

export class HoraireCreateDto {

    @IsNotEmpty()
    corporate: Corporate;

    @IsNotEmpty()
    name_horaire: string; // Horaire 

    @IsNotEmpty()
    personnel_shift_1: string[];

    @IsNotEmpty()
    date_shift_1: string[];

    @IsNotEmpty()
    time_1: string;

    @IsNotEmpty()
    personnel_shift_2: string[];

    @IsNotEmpty()
    date_shift_2: string[];

    @IsNotEmpty()
    time_2: string;

    @IsNotEmpty()
    personnel_shift_3: string[];

    @IsNotEmpty()
    date_shift_3: string[];

    @IsNotEmpty()
    time_3: string;

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