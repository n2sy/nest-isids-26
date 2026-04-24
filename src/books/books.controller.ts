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
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { IsAdminGuard } from 'src/guards/is-admin/is-admin.guard';

@Controller('books')
export class BooksController {
  @Inject(BooksService) bookSer: BooksService;

  @Get('/all')
  async chercherTousLesLivres() {
    try {
      let data = await this.bookSer.getAllBooks();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Post('/new')
  async ajouterLivre(@Req() req: any, @Body() body) {
    console.log('User from request:', req.user); // Debug
    console.log('Body received:', body); // Debug
    
    // ✅ CORRECTION : Utiliser req.user.userId (comme défini dans jwt.strategy)
    const userId = req.user?.userId;
    
    if (!userId) {
      throw new Error('User ID not found in token');
    }
    
    // ✅ S'assurer que l'auteur est bien formaté
    const bookData = {
      title: body.title,
      year: parseInt(body.year),
      editor: body.editor,
      image: body.image,
      author: body.author || body.authorId, // Accepter les deux formats
    };
    
    console.log('Book data to save:', bookData);
    
    let data = await this.bookSer.addBook(bookData, userId);
    return { data };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/search/:id')
  async chercherBook(@Param('id', ParseIntPipe) id, @Req() request) {
    console.log("ROLE", request.user?.userRole);
    return this.bookSer.getBookById(id);
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Put('/edit/:id')
  async modifierBook(@Body() body, @Param('id', ParseIntPipe) id) {
    console.log('Update book - ID:', id, 'Data:', body);
    let response = await this.bookSer.updateBook(id, body);
    return response;
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Delete('remove/:id')
  async removeBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.removeBook(id);
    return response;
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Delete('delete/:id')
  async deleteBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.deleteBook(id);
    return response;
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Delete('softdelete/:id')
  async softDeleteBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.softDeleteBook(id);
    return response;
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Patch('restore/:id')
  async restoreBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.restoreBook(id);
    return response;
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Patch('recover/:id')
  async recoverBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.recoverBook(id);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async nbreLivresParAnnee() {
    let response = await this.bookSer.nbBooksPerYear();
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats/v2')
  async nbreLivresParAnneeV2(@Query('year1') year1, @Query('year2') year2) {
    let response = await this.bookSer.nbBooksPerYearV2(year1, year2);
    return response;
  }
}