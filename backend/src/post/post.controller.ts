import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostInput } from './dto/post.input';
import { ObjectId } from 'mongodb';
import { SaleType } from 'src/sale/dto/sales.output';

@Controller('posts')
@ApiTags('Posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':type')
  async getPosts(@Param() type: SaleType) {
    return this.postService.getPosts(type);
  }

  @Post('new')
  createPost(@Body() post: PostInput) {
    return this.postService.createPost(
      ObjectId.createFromHexString(post.userId),
      post.type,
      post.price,
    );
  }
}
