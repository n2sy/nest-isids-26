import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
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
  @Delete('softdelete/:id')
  async softDeleteBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.softDeleteBook(id);
    return response;
  }
  
  @Patch('restore/:id')
  async restoreBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.restoreBook(id);
    return response;
  }
  @Patch('recover/:id')
  async recoverBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.recoverBook(id);
    return response;
  }
  
  @Get('stats')
  async nbreLivresParAnnee() {
    let response = await this.bookSer.nbBooksPerYear();
    return response;
  }
  @Get('stats/v2')
  async nbreLivresParAnneeV2(@Query('year1') year1, @Query('year2') year2) {
    let response = await this.bookSer.nbBooksPerYearV2(year1, year2);
    return response;
  }
}
