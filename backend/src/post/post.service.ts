import { Injectable } from '@nestjs/common';
import { InjectCollection } from 'src/mongodb/inject-collection.decorator';
import { PostEntity } from './entities/post.entity';
import { Collection, ObjectId } from 'mongodb';
import { SaleType } from 'src/sale/dto/sales.output';
import { PostInput } from './dto/post.input';

@Injectable()
export class PostService {
  constructor(
    @InjectCollection(PostEntity)
    private readonly postCollection: Collection<PostEntity>,
  ) {}

  async createPost(userId: ObjectId, type: SaleType, price: number) {
    const date = new Date();

    const post: Required<PostEntity> = {
      userId,
      type,
      price,
      created_at: date,
      modified_at: date,
      closed_at: null,
    };

    return await this.postCollection.insertOne(post);
  }

  getPosts(type: SaleType) {
    const posts = this.postCollection.find({ type: type });
    return posts.map(PostInput.fromEntity);
  }
}
