import { Injectable } from '@nestjs/common';
import { InjectCollection } from 'src/mongodb/inject-collection.decorator';
import { SaleEntity } from './entities/sale.entity';
import { Collection, ObjectId } from 'mongodb';
import { SaleType } from './dto/sales.output';

@Injectable()
export class SaleService {
  constructor(
    @InjectCollection(SaleEntity)
    private readonly saleCollection: Collection<SaleEntity>,
  ) {}

  async createSale(type: SaleType, buyer: ObjectId, price: number) {
    const date = new Date();

    console.log(buyer);

    const x: Required<SaleEntity> = {
      userId: ObjectId.createFromHexString('66d8688aeb43a1506c21d98c'),
      type,
      buyer,
      date,
      price,
    };

    return await this.saleCollection.insertOne(x);
  }
}
