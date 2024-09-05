import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ObjectId } from 'mongodb';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async getUser(@Param('username') username: string) {
    const data = await this.userService.getUser(username);
    console.log(data);
    return data;
  }

  @Get(':userId/sales')
  getSales(@Param('userId') userId: ObjectId) {
    return this.userService.getSalesByUserId(userId) || [];
  }
}
