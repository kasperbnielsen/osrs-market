import { Module } from '@nestjs/common/decorators';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { SaleModule } from 'src/sale/sale.module';

@Module({
  imports: [SaleModule],
  providers: [PostService],
  controllers: [PostController],
  exports: [],
})
export class PostModule {}
