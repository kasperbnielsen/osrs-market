import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SaleModule } from './sale/sale.module';
import { UserModule } from './user/user.module';
import { MongoModule } from './mongodb/mongo-database.module';
import { SaleEntity } from './sale/entities/sale.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/entities/user.entity';
import { PostModule } from './post/post.module';
import { PostEntity } from './post/entities/post.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SaleModule,
    UserModule,
    PostModule,
    AuthModule,
    MongoModule.forRoot([SaleEntity, UserEntity, PostEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
