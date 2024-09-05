import { Module } from '@nestjs/common';
import { SaleModule } from 'src/sale/sale.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [SaleModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
