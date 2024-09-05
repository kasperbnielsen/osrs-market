import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';
import { SaleEntity } from '../entities/sale.entity';
import { WithId } from 'mongodb';

export enum SaleType {
  gold = 'Gold',
  account = 'Account',
  service = 'Service',
}

export class Sale {
  @IsString()
  @IsMongoId()
  id: string;

  @IsEnum(SaleType)
  @ApiProperty({ enum: SaleType, enumName: 'SaleType' })
  type: SaleType;

  @IsString()
  @IsMongoId()
  buyer: string;

  @IsDate()
  date: Date;

  @IsNumber()
  price: number;

  static fromEntity(input: WithId<SaleEntity>) {
    const output: Sale = {
      id: input._id.toHexString(),
      type: input.type,
      buyer: input.buyer.userId.toHexString(),
      date: input.date,
      price: input.price,
    };
    return output;
  }
}
