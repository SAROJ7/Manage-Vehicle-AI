import { VectorDatabase } from '../interface/vector-database.interface';
import {
  VectorStore,
  VectorStoreRetriever,
} from '@langchain/core/vectorstores';
import { DatabaseConfig } from '../type/vectot-store-config.type';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { Logger } from '@nestjs/common';

export class MemoryVectorDBService implements VectorDatabase {
  private readonly logger = new Logger(MemoryVectorDBService.name);
  private vectorStore: VectorStore;

  async init({ docs, embeddings }: DatabaseConfig): Promise<void> {
    this.logger.log(`MemoryVectorStoreService init called.`);
    this.vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
  }

  asRetriever(): VectorStoreRetriever<VectorStore> {
    return this.vectorStore.asRetriever();
  }
}
