import { Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getMyFavorites(@Req() req) {
    return this.favoritesService.getMyFavorites(req.user.userId);
  }

  @Post(':bookId')
  addFavorite(@Req() req, @Param('bookId', ParseIntPipe) bookId: number) {
    return this.favoritesService.addFavorite(req.user.userId, bookId);
  }

  @Delete(':bookId')
  removeFavorite(@Req() req, @Param('bookId', ParseIntPipe) bookId: number) {
    return this.favoritesService.removeFavorite(req.user.userId, bookId);
  }
}
