import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';
import { SaleType } from './sales.output';

export class CreateSaleInput {
  @IsEnum(SaleType)
  @ApiProperty({ enum: SaleType, enumName: 'SaleType' })
  itemType: SaleType;

  @IsString()
  @IsMongoId()
  buyer: string;

  @IsNumber()
  price: number;
}
