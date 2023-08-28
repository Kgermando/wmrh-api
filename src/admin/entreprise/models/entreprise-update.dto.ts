import { AbonnementClient } from "src/admin/abonnement_client/models/abonnement_client.entity";

export class EntrepriseUpdateDto {
    company_name?: string; 
    rccm?: string; 
    id_nat?: string; 
    responsable?: string; 
    telephone?: string; 
    email?: string; 
    adresse?: string;
    code_entreprise?: string; 
    nbre_employe?: number; 
    statut?: boolean; // statut abonnement 
    abonnements?: AbonnementClient[]; 
    signature?: string; 
    created?: Date; 
    update_created?: Date;
}