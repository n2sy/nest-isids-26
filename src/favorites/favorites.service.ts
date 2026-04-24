import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteEntity } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepo: Repository<FavoriteEntity>,
  ) {}

  async addFavorite(userId: number, bookId: number) {
    const existing = await this.favoriteRepo.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
    });
    if (existing) return { message: 'Déjà en favoris' };

    const fav = this.favoriteRepo.create({
      user: { id: userId },
      book: { id: bookId },
    });
    await this.favoriteRepo.save(fav);
    return { message: 'Ajouté aux favoris' };
  }

  async removeFavorite(userId: number, bookId: number) {
    const fav = await this.favoriteRepo.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
    });
    if (!fav) throw new NotFoundException('Favori introuvable');
    await this.favoriteRepo.remove(fav);
    return { message: 'Retiré des favoris' };
  }

  async getMyFavorites(userId: number) {
    const favs = await this.favoriteRepo.find({
      where: { user: { id: userId } },
      relations: { book: true },
    });
    return favs.map((f) => f.book);
  }
}
