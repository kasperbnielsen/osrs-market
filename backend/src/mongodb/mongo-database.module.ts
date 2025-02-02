import {
  type DynamicModule,
  type FactoryProvider,
  Logger,
  Module,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Collection, CreateIndexesOptions } from 'mongodb';
import { MongoDatabaseService } from './mongo-database.service';
import { pluralize } from './pluralize';
import {
  CollectionDefinition,
  IndexedCollection,
  PlainCollection,
} from './types';

@Module({
  imports: [ConfigModule],
  providers: [MongoDatabaseService],
  exports: [MongoDatabaseService],
})
export class MongoModule {
  static async forRoot(
    entities: (IndexedCollection | PlainCollection)[],
  ): Promise<DynamicModule> {
    const providers = await createDatabaseProviders(entities);
    return {
      global: true,
      module: MongoModule,
      providers,
      exports: providers,
    };
  }
}

export function getCollectionToken(t: CollectionDefinition) {
  return `COLLECTION_${getCollectionNameFor(t)}`;
}

export function createDatabaseProviders(
  definitions: CollectionDefinition[],
): FactoryProvider[] {
  return definitions.map((definition) => ({
    provide: getCollectionToken(definition),
    inject: [MongoDatabaseService],
    useFactory: async (
      mongoDatabaseService: MongoDatabaseService,
    ): Promise<Collection> => {
      const collectionName = getCollectionNameFor(definition);

      const collections = await mongoDatabaseService.db
        .listCollections({ name: collectionName }, { nameOnly: true })
        .toArray();

      const created = collections.some((c) => c?.name === collectionName);

      let collection: Collection;
      if (created) {
        collection = mongoDatabaseService.db.collection(collectionName);
      } else {
        collection =
          await mongoDatabaseService.db.createCollection(collectionName);
      }

      try {
        await mongoDatabaseService.db.command({
          collMod: collectionName,
          changeStreamPreAndPostImages: { enabled: true },
        });
      } catch (e) {
        Logger.error(e);
      }

      await _createIndexes(definition, collection);
      return collection;
    },
  }));
}

async function _createIndexes(
  definition: CollectionDefinition,
  collection: Collection,
): Promise<void> {
  if (definition.indexes) {
    for (const indexDefinition of definition.indexes()) {
      if (Array.isArray(indexDefinition)) {
        const index = indexDefinition?.[0];

        const indexOptions = indexDefinition[1] as CreateIndexesOptions;

        await collection.createIndex(index, indexOptions).catch((e) => {
          if (e?.code === 86 || e?.code === '86' /*IndexKeySpecsConflict*/) {
            console.error(
              `As stated by the exception mongo cannot create the index, because an existing index with different options and the same autogenerated name exists.
                      Explicitly naming it the index will resolve this, naming the same as the existing index will override it (ie: delete and recreate it), while giving it a new name will result in 2 indexes: The previous one and the new one - you probably want to delete the old one manually in dev/prod.
                      Alternatively you can manually update the index in the environment you are deploying into.`,
            );
            throw e;
          }
        });
      } else {
        await collection.createIndex(indexDefinition);
      }
    }
  }
}

export function getCollectionNameFor(t: CollectionDefinition) {
  return pluralize(t.name.charAt(0).toLowerCase() + t.name.slice(1));
}
