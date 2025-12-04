import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TimeStampISIDS } from "../shared/timestamp";
import { BookEntity } from "./book.entity";


@Entity('auteur')
export class AuthorEntity extends TimeStampISIDS {
    
    @PrimaryGeneratedColumn()
        id;
        
        @Column()
        prenom : string;
        
        @Column()
        nom : string;
        
        @OneToMany(type => BookEntity, book => book.author, 
          {
            eager : true
          }
        )
        listeLivres : BookEntity[];
        
      
    
}
