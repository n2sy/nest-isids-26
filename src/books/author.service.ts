import { Injectable } from '@nestjs/common';
import { AuthorEntity } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
      constructor(
        @InjectRepository(AuthorEntity) private authorRepo: Repository<AuthorEntity>,
      ) {}
      
      getAllAuthors() {
        return this.authorRepo.find(
          
        );
      }
      
      addAuthor(newAuthor) {
        return this.authorRepo.save(newAuthor)
      }
    
}
