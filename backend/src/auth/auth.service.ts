import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { Collection } from 'mongodb';
import { InjectCollection } from 'src/mongodb/inject-collection.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectCollection(UserEntity)
    private readonly userCollection: Collection<UserEntity>,
    private readonly userService: UserService,
  ) {}

  async authenticateUser(email: string, password: string) {
    const user = await this.userService.getUser(email);

    if (!user) throw new NotFoundException();

    if (!bcrypt.compareSync(password, user.hash))
      throw new UnauthorizedException();

    return user;
  }

  async createUser(username: string, email: string, password: string) {
    const newUsername = username.trim().toLowerCase();
    const newEmail = email.trim().toLowerCase();

    const usernameExists = await this.userCollection.findOne({
      username: newUsername,
    });

    if (usernameExists)
      throw new HttpException('Username already in use', HttpStatus.CONFLICT);

    const emailExists = await this.userCollection.findOne({ email: newEmail });

    if (emailExists)
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const date = new Date();

    return this.userCollection.insertOne({
      username: newUsername,
      email: newEmail,
      hash,
      created_at: date,
      modified_at: date,
    });
  }
}
