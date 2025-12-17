import {
  Module,
  RequestMethod,
  type MiddlewareConsumer,
  type NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { BooksModule } from './books/books.module';
import { FirstMiddleware } from './middlewares/first/first.middleware';
import { SecondMiddleware } from './middlewares/second/second.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TasksModule,
    BooksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: 'root',
      password: 'root',
      database: 'isids26',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(FirstMiddleware).forRoutes(''); // appliqué pour toutes les routes
    // consumer.apply(FirstMiddleware).forRoutes('tasks/*'); // appliqué pour toutes les routes
    consumer.apply(SecondMiddleware).forRoutes('');
    consumer.apply(FirstMiddleware).forRoutes({
      path: 'tasks/*',
      method: RequestMethod.GET,
    });
  }
  
  constructor(private configSer : ConfigService) {}
}
