import { Body, Controller, ImATeapotException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  async login(@Body() user: AuthInput) {
    const authUser = await this.authService.authenticateUser(
      user.username,
      user.password,
    );
    return { hash: '', ...authUser };
  }

  @Post('newUser')
  createUser(@Body() user: AuthInput) {
    const newUser = this.authService.createUser(user.username, user.password);

    if (!newUser) throw new ImATeapotException();

    return newUser;
  }
}
