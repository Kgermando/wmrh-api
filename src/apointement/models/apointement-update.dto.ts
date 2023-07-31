import { Personnel } from "src/personnel/models/personnel.entity";

export class ApointementUpdateDto {

    matricule?: string;

    apointement?: string;

    // counter?: boolean;

    // presence?: boolean;

    observation?: string;

    date_entree?: Date;

    date_sortie?: Date;

    personnel?: Personnel;

    signature?: string;

    created?: Date;

    update_created: Date;  
}