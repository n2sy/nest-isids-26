import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";


export class TimeStampISIDS {
    
    @CreateDateColumn()
    createdAt;
    
    @UpdateDateColumn()
    updateAt;
    
    @DeleteDateColumn()
    deleteAt;
}
