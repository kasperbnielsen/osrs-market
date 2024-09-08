import { Body, Controller, ImATeapotException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  async login(@Body() user: LoginInput) {
    const authUser = await this.authService.authenticateUser(
      user.email,
      user.password,
    );
    return { hash: '', ...authUser };
  }

  @Post('register')
  createUser(@Body() user: RegisterInput) {
    const newUser = this.authService.createUser(
      user.username,
      user.email,
      user.password,
    );

    if (!newUser) throw new ImATeapotException();

    return newUser;
  }
}
