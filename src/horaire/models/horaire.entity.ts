import { Corporate } from "src/corporate/models/corporate.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('horaires')
export class Horaire {

    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(() => Corporate, (co)=> co.horaires, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    corporate: Corporate;

    @Column()
    name_horaire: string; // Horaire 

    @Column('simple-array', { nullable: true })
    personnel_shift_1: string[];

    @Column('simple-array', { nullable: true })
    date_shift_1: string[];

    @Column()
    time_1: string;

    @Column('simple-array', { nullable: true })
    personnel_shift_2: string[];

    @Column('simple-array', { nullable: true })
    date_shift_2: string[];
    
    @Column()
    time_2: string;

    @Column('simple-array', { nullable: true })
    personnel_shift_3: string[];

    @Column('simple-array', { nullable: true })
    date_shift_3: string[];

    @Column()
    time_3: string;

    @Column()
    signature: string;

    @Column()
    created: Date;

    @Column()
    update_created : Date;

    @Column()
    entreprise: string;
    
    @Column()
    code_entreprise: string;
    
}