import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
    
    constructor(@InjectRepository(BookEntity) private bookRepo : Repository<BookEntity> ) {
        
    }
    
    async getAllBooks() {
        try {
            let tab = await this.bookRepo.find();
            
        }
        catch(err) {
            
        }
        
        // this.bookRepo.find().then(res => {
        //     console.log(res);
            
        // }).catch(err => {
        //     console.log(err);   
        // })
        
    }
    
    addBook() {
        
    }
    
    getBookById() {
        
    }
    
    updateBook() {
        
    }
    
    deleteBook() {
        
    }
    
    
}
