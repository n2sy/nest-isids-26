import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  @Inject(BooksService) bookSer: BooksService;

  @Get('/all')
  async chercherTousLesLivres(@Req() req: Request) {
    console.log(req);
    try {
      let data = await this.bookSer.getAllBooks();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  @Post('/new')
  async ajouterLivre(@Req() req: Request, @Body() body) {
    let data = await this.bookSer.addBook(body);
    return { data };
  }

  @Get('/search/:id')
  async chercherBook(@Param('id', ParseIntPipe) id) {
    return this.bookSer.getBookById(id);
  }

  @Put('/edit/:id')
  async modifierBook(@Body() body, @Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.updateBook(body, id);
    return response;
  }

  @Delete('remove/:id')
  async removeBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.removeBook(id);
    return response;
  }

  @Delete('delete/:id')
  async deleteBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.deleteBook(id);
    return response;
  }
}
