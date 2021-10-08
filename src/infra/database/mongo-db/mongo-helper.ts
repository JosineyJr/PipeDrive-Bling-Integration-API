import { MongoClient, Collection } from 'mongodb';

type MongoHelper = {
  client: MongoClient;
  uri: string;
  connect: (uri: string) => Promise<void>;
  disconnect: () => Promise<void>;
  getCollection: (name: string) => Collection;
  map: (data: any) => any;
  mapCollection: (data: any) => Array<any>;
};

export const MongoHelper: MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri);
  },

  async disconnect(): Promise<void> {
    await this.client?.close();
    this.client = null as unknown as MongoClient;
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  map: (data: any): any => {
    const { _id, ...rest } = data;
    return { ...rest, id: _id.toHexString() };
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c));
  },
};
