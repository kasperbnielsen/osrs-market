import { Body, Controller, Post } from '@nestjs/common';
import { SaleService } from './sale.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateSaleInput } from './dto/create-sale.input';
import { ObjectId } from 'mongodb';

@Controller('sales')
@ApiTags('Sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post('')
  createSale(@Body() sale: CreateSaleInput) {
    return this.saleService.createSale(
      sale.itemType,
      ObjectId.createFromHexString(sale.buyer),
      sale.price,
    );
  }
}
