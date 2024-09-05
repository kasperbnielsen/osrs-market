import {
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

  async authenticateUser(username: string, password: string) {
    const user = await this.userService.getUser(username);

    if (!user) throw new NotFoundException();
    console.log(user);

    if (!bcrypt.compareSync(password, user.hash))
      throw new UnauthorizedException();

    return user;
  }

  async createUser(username: string, password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return this.userCollection.insertOne({ username, hash });
  }
}
