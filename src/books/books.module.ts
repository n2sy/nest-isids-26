import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';

@Module({
    imports : [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
