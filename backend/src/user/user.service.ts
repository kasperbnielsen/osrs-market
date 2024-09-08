import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { InjectCollection } from 'src/mongodb/inject-collection.decorator';
import { UserEntity } from './entities/user.entity';
import { SaleEntity } from 'src/sale/entities/sale.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectCollection(UserEntity)
    private readonly userCollection: Collection<UserEntity>,
    @InjectCollection(SaleEntity)
    private readonly saleCollection: Collection<SaleEntity>,
  ) {}

  async getUser(email: string) {
    return await this.userCollection.findOne({ email });
  }

  async getSalesByUserId(userId: ObjectId) {
    return await this.saleCollection.find({ userId }).toArray();
  }
}
