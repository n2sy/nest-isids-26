import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    
    constructor(private authSer : AuthService) {
        
    }
    
    @Post('signup')
    inscription(@Body() body) {
       return this.authSer.signUp(body);
    }
    
    @Post('signin')
    seConnecter(@Body() body) {
       return this.authSer.signIn(body);
    }
}
