import { Personnel } from "src/personnel/models/personnel.entity";

export class SalaireUpdateDto { 
    personnel?: Personnel;
    monnaie?: string;
    taux_dollard?: string;
    nbr_dependants?: number;
    alloc_logement?: string;
    alloc_transport?: string;
    alloc_familliale?: string;
    salaire_base?: string;
    primes?: string;
    prime_anciennete?: string;
    heures_supp?: number;
    heureSupplementaireMonnaie?: string; 
    conge_paye?: string;
    nbre_jrs_preste?: number;
    rbi?: string;
    cnssQPO?: string;
    rni?: string;
    ipr?: string;
    syndicat?: string;
    penalites?: string;
    avance_slaire?: string;
    net_a_payer?: string;
    statut?: string;  // Pending, Generated
    signature?: string;
    created?: Date;
    update_created?: Date; 
    entreprise?: string; 
    code_entreprise?: string; 
}