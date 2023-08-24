import { Personnel } from "src/personnel/models/personnel.entity";

export class NotifyUpdateDto { 
    personnel?: Personnel;

    isRead?: boolean; 

    title?: string; 

    route?: string;

    
    signature?: string; 

    created?: Date; 

    update_created: Date; 

    entreprise?: string;
 
    code_entreprise?: string; 
}