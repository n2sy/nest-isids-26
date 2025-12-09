import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './generics/role.enum';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
      constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        private jwtSer : JwtService
      ) {}
    async signUp(informations) {
        let newUserEntity = this.userRepo.create(
            {
                email : informations.email,
                username : informations.username,
                role : informations.role || Roles.ROLE_USER,
                salt : await bcrypt.genSalt()
            }
         );
         console.log(newUserEntity.salt);
         
         newUserEntity.password = await bcrypt.hash(informations.password, newUserEntity.salt);
         
         try {
            let data = await this.userRepo.save(newUserEntity);
            return data;
         }
         catch{
            throw new ConflictException()
         }
        
    }
    
    async signIn(informations) {
        // let identifiant = informations.identifiant;
        // let password = informations.password;
        
        // Destructing
        let { identifiant, password } = informations;
        
        let qb = await this.userRepo.createQueryBuilder('user');
        let user = await qb.select('user')
        .where('user.username = :ident or user.email = :ident')
        .setParameter("ident", identifiant)
        .getOne();
        
        if(!user) throw new NotFoundException("Identifiant inexistant")
            
        let resultMatching = await bcrypt.compare(password, user.password);
        
        if(resultMatching) {
            let token = this.jwtSer.sign({email : user.email, role : user.role})
            return {
                ...user,
                access_token : token
            }
        }
        else {
            throw new NotFoundException("Mot de passe erroné");
        }
    }
}
