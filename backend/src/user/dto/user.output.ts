import { IsMongoId, IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';
import { WithId } from 'mongodb';

export class User {
  @IsString()
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;

  @IsString()
  hash: string;

  static fromEntity(input: WithId<UserEntity>) {
    const output: User = {
      _id: input._id.toHexString(),
      name: input.username,
      hash: input.hash,
    };

    return output;
  }
}
