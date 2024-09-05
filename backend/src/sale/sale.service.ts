import { Injectable } from '@nestjs/common';
import { InjectCollection } from 'src/mongodb/inject-collection.decorator';
import { SaleEntity, SaleEntityBuyer } from './entities/sale.entity';
import { Collection, ObjectId } from 'mongodb';
import { SaleType } from './dto/sales.output';

@Injectable()
export class SaleService {
  constructor(
    @InjectCollection(SaleEntity)
    private readonly saleCollection: Collection<SaleEntity>,
  ) {}

  async createSale(
    userId: ObjectId,
    type: SaleType,
    buyer: SaleEntityBuyer,
    price: number,
  ) {
    const date = new Date();

    return await this.saleCollection.insertOne({
      userId,
      type,
      buyer,
      date,
      price,
    });
  }
}
