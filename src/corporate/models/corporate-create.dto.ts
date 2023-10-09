import { IsNotEmpty } from "class-validator"; 
import { Entreprise } from "src/admin/entreprise/models/entreprise.entity";
import { Personnel } from "src/personnel/models/personnel.entity";
import { Departement } from "src/departement/models/departement.entity";
import { Fonction } from "src/fonction/models/fonction.entity";
import { ServicePref } from "src/service-pref/models/service-pref.entity";
import { SiteLocation } from "src/site-location/models/site-location.entity";
import { Title } from "src/title/models/title.entity";

export class CorporateCreateDto {

    entreprise_id: Entreprise;

    personnels: Personnel[];

    logo: string;

    @IsNotEmpty()
    corporate_name: string; // Nom de la corporate
    
    @IsNotEmpty()
    statut: boolean; // statut entreprise sous traitant

    @IsNotEmpty()
    code_corporate: string;

    @IsNotEmpty()
    nbre_employe: number;

    @IsNotEmpty()
    rccm: string;

    @IsNotEmpty()
    id_nat: string;

    @IsNotEmpty()
    numero_impot: string;

    @IsNotEmpty()
    numero_cnss: string;

    @IsNotEmpty()
    responsable: string;

    @IsNotEmpty()
    telephone: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    adresse: string;

    departements: Departement;
 
    titles: Title;
  
    fonctions: Fonction;
 
    services: ServicePref; 
 
    site_locations: SiteLocation;

    @IsNotEmpty()
    code_entreprise: string;
 
    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}