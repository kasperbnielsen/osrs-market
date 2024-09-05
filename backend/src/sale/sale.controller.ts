import { Body, Controller, Post } from '@nestjs/common';
import { SaleService } from './sale.service';
import { ApiTags } from '@nestjs/swagger';
import { SaleEntity } from './entities/sale.entity';

@Controller('sales')
@ApiTags('Sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post('')
  createSale(@Body() sale: SaleEntity) {
    return this.saleService.createSale(
      sale.userId,
      sale.type,
      sale.buyer,
      sale.price,
    );
  }
}
