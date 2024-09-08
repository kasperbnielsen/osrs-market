import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { SaleType } from 'src/sale/dto/sales.output';
import { PostEntity } from '../entities/post.entity';
import { WithId } from 'mongodb';

export class PostInput {
  @IsString()
  @IsMongoId()
  userId: string;

  @IsEnum(SaleType)
  @ApiProperty({ enum: SaleType, enumName: 'SaleType' })
  type: SaleType;

  @IsNumber()
  @IsPositive()
  price: number;

  static fromEntity(input: WithId<PostEntity>) {
    return {
      userId: input.userId.toHexString(),
      ...self,
    };
  }
}
