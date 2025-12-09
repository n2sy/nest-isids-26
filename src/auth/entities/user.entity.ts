import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../generics/role.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;
  
  @Column({
    type : "enum",
    enum : Roles,
    default : Roles.ROLE_USER
  })
  role ;
  
  
}
