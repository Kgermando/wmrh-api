import { Entreprise } from "src/admin/entreprise/models/entreprise.entity";
import { Personnel } from "src/personnel/models/personnel.entity";
import { Departement } from "src/departement/models/departement.entity";
import { Fonction } from "src/fonction/models/fonction.entity";
import { ServicePref } from "src/service-pref/models/service-pref.entity";
import { SiteLocation } from "src/site-location/models/site-location.entity";
import { Title } from "src/title/models/title.entity";

export class CorporateUpdateDto {
    entreprise_id?: Entreprise;
    personnels?: Personnel[];
    logo?: string;
    corporate_name?: string; // Nom de la corporate
    statut?: boolean; // statut entreprise sous traitant
    code_corporate?: string;
    nbre_employe?: number;
    rccm?: string;
    id_nat?: string;
    numero_impot?: string;
    numero_cnss?: string;
    responsable?: string;
    telephone?: string;
    email?: string;
    adresse?: string;
    departements?: Departement; 
    titles?: Title;
    fonctions?: Fonction; 
    services?: ServicePref; 
    site_locations?: SiteLocation;
    code_entreprise?: string;
    signature?: string; 
    created?: Date; 
    update_created?: Date;
}