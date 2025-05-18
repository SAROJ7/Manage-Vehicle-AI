import { DatabaseConfig } from '../type/vectot-store-config.type';
import {
  VectorStoreRetriever,
  VectorStore,
} from '@langchain/core/vectorstores';

export interface VectorDatabase {
  init(config: DatabaseConfig): Promise<void>;
  asRetriever(): VectorStoreRetriever<VectorStore>;
}
