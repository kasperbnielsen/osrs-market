import { ObjectId } from 'mongodb';
import { SaleType } from 'src/sale/dto/sales.output';

export class PostEntity {
  userId: ObjectId;
  type: SaleType;
  price: number;
  created_at: Date;
  modified_at: Date;
  closed_at: Date | null;
}
