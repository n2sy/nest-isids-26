import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports : [TypeOrmModule.forFeature([UserEntity]),
JwtModule.register(
    {
        secret : "supersecretcode",
        signOptions : {
            expiresIn : '1w'
        }
    }
)],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
