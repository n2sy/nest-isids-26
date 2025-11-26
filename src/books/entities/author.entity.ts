import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimeStampISIDS } from "../shared/timestamp";


@Entity('auteur')
export class AuthorEntity extends TimeStampISIDS {
    
    @PrimaryGeneratedColumn()
        id;
        
        @Column()
        prenom : string;
        
        @Column()
        nom : string;
        
      
    
}
