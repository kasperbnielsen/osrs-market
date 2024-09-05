import { Inject } from '@nestjs/common';
import { getCollectionToken } from './mongo-database.module';
import { PlainCollection } from './types';

export const InjectCollection = (collectionName: PlainCollection) =>
  Inject(getCollectionToken(collectionName));
