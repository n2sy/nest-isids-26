import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimeStampISIDS } from "../shared/timestamp";


@Entity('livre')
export class BookEntity extends TimeStampISIDS {
   
    @PrimaryGeneratedColumn()
    id;
    
    @Column(
        {
            //name : 'titre'
            //type : "varchar"
            length : 50,
            //unique : true
            //update : false
        }
    )
    title : string;
    
    @Column()
    year : number;
    
    @Column(
        {
            type: "varchar"
        }
    )
    editor;// : string;
    
    @Column()
    image : string;
    
   
    
}
