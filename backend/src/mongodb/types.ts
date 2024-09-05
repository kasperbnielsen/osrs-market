import { CreateIndexesOptions } from 'mongodb';
import { IndexDirection } from 'mongodb';

export declare type GenericIndexSpecification<T> = {
  [P in keyof T]?: IndexDirection;
};

export declare type GenericIndex<T = unknown> =
  | [GenericIndexSpecification<Omit<T, 'indexes'>>, CreateIndexesOptions]
  | GenericIndexSpecification<Omit<T, 'indexes'>>;

export type CollectionDefinition = PlainCollection | IndexedCollection;

export interface IndexedCollection {
  // TODO: remove @ts-expect-error directive
  new ();
  indexes(): GenericIndex[];
}

export function IndexedCollection<T>(indexes: () => GenericIndex<T>[]) {
  return <U extends PlainCollection>(constructor: U) => {
    constructor.indexes = indexes;
  };
}

export interface PlainCollection {
  // TODO: remove @ts-expect-error directive
  new ();
  indexes?(): GenericIndex[];
}
