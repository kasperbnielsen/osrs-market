import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';

@Module({
  imports: [],
  providers: [SaleService],
  controllers: [SaleController],
  exports: [SaleService],
})
export class SaleModule {}
