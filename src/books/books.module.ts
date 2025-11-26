import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { AuthorEntity } from './entities/author.entity';

@Module({
    imports : [TypeOrmModule.forFeature([BookEntity, AuthorEntity])],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
