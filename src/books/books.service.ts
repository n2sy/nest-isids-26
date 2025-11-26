import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>,
  ) {}

  async getAllBooks() {
    try {
      let tab = await this.bookRepo.find(
      );
      return { listeBooks: tab };
    } catch (err) {
      return { message: 'Problème avec TypeOrm' };
    }

    // this.bookRepo.find().then(res => {
    //     console.log(res);

    // }).catch(err => {
    //     console.log(err);
    // })
  }

  addBook(newBook) {
    return this.bookRepo.save(newBook);
  }

  async getBookById(selectedId) {
    try {
      let selectedBooks = await this.bookRepo.find({
        where: {
          id: selectedId,
        },
      });
      if (!selectedBooks.length) throw new NotFoundException();
      else return selectedBooks;
    } catch (err) {
      return err;
    }
  }

  async updateBook(selectedId, uBook) {
    let b = await this.bookRepo.preload({
      id: selectedId,
      //   title: uBook.title,
      //   editor: uBook.editor,
      //   year: uBook.year,
      //   image: uBook.image,
      ...uBook,
    });
    let response = await this.bookRepo.save(b);
    return { message: 'Livre mise à jour', response };
  }

  async deleteBook(id) {
    let response = await this.bookRepo.delete(id);
    return response;
  }

  async removeBook(selectedId) {
    let selectedBook = await this.bookRepo.findOneBy({
      id: selectedId,
    });
    let response = await this.bookRepo.remove(selectedBook);
    return {
        message: `Le livre ${response.title} a été supprimé avec succès`,
    };
}

async softDeleteBook(id) {
    let reponse = await this.bookRepo.softDelete(id)
    return reponse;
}

async restoreBook(id) {
    let reponse = await this.bookRepo.restore(id);
    return reponse;
}

 async recoverBook(selectedId) {
    let selectedBook = await this.bookRepo.findOneBy({
      id: selectedId,
      
    });
    let response = await this.bookRepo.recover(selectedBook);
    return {
        message: `Le livre ${response.title} a été restauré avec succès`,
    };
}

async softRemoveBook(selectedId) {
      let selectedBook = await this.bookRepo.findOneBy({
        id: selectedId,
      });
    let reponse = await this.bookRepo.softRemove(selectedBook)
    return reponse;
  }
  
  async nbBooksPerYear() {
    let qb = this.bookRepo.createQueryBuilder('book');
    return qb.select('book.year, count(book.id) as NbBooks')
    .groupBy('book.year')
    .getRawMany()
  }
  
  async nbBooksPerYearV2(y1, y2) {
    let qb = this.bookRepo.createQueryBuilder('book');
    return qb.select('book.year, count(book.id) as NbBooks')
    .where('book.year >= :yearMin and book.year <= :yearMax', {yearMin : y1, yearMax : y2})
    //.setParameters({yearMin : y1, yearMax : y2})
    .groupBy('book.year')
    .getRawMany()
  }
    
    
    
    
    
    
    
  
}
