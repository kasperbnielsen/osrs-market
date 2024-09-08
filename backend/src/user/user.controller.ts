import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ObjectId } from 'mongodb';
import { Sale } from 'src/sale/dto/sales.output';
import { User } from './dto/user.output';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async getUser(@Param('username') username: string): Promise<User> {
    const data = await this.userService.getUser(username);
    console.log(data);
    return User.fromEntity(data);
  }

  @Get(':user_id/sales')
  async getUserSales(@Param('user_id') userId: string): Promise<Sale[]> {
    const sales = await this.userService.getSalesByUserId(
      ObjectId.createFromHexString(userId),
    );

    return sales.map(Sale.fromEntity);
  }
}
