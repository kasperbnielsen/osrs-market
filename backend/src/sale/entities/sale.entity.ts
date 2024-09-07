import { ObjectId } from 'mongodb';
import { SaleType } from '../dto/sales.output';
import { IndexedCollection } from 'src/mongodb/types';

export class SaleEntityBuyer {
  userId: ObjectId;
  name: string;
}

@IndexedCollection<SaleEntity>(() => [[{ userId: 1 }, {}]])
export class SaleEntity {
  userId: ObjectId;
  type: SaleType;
  buyer: ObjectId;
  date: Date;
  price: number;
}
