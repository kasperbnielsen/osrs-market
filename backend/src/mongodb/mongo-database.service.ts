import { OnModuleDestroy } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientSession, Db } from 'mongodb';
import { MongoClient } from 'mongodb';

export type SessionAction<T> = (session: ClientSession) => Promise<T>;

@Injectable()
export class MongoDatabaseService implements OnModuleDestroy {
  private client!: MongoClient;
  public db!: Db;

  constructor(private readonly configService: ConfigService) {
    this.client = new MongoClient(
      this.configService.getOrThrow('DATABASE_URI'),
      {
        serverSelectionTimeoutMS: 5000,
        appName: 'market-api',
      },
    );
    this.db = this.client.db(this.configService.getOrThrow('DATABASE_NAME'));
  }

  async runInTransaction<T>(action: SessionAction<T>) {
    const session = this.client.startSession();
    let result: T;

    try {
      session.startTransaction();
      result = await action(session);
      await session.commitTransaction();
    } catch (error) {
      Logger.error(`Transaction failed with error: ${error}`);
      Logger.error('Aborting transaction');
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }

    return result;
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
