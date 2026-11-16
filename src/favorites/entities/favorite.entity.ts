import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { BookEntity } from 'src/books/entities/book.entity';

@Entity('favorite')
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
  book: BookEntity;
}
