import { IsString } from 'class-validator';

export class AuthInput {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
