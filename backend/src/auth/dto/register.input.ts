import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterInput {
  @IsString()
  @Length(2, 50)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(7)
  password: string;
}
