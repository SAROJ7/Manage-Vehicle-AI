import { InternalServerErrorException, Logger } from '@nestjs/common';
import { VectorDatabase } from '../interface/vector-database.interface';
import {
  VectorStore,
  VectorStoreRetriever,
} from '@langchain/core/vectorstores';
import { DatabaseConfig } from '../type/vectot-store-config.type';
import { QdrantDatabseConfig } from '../type/qdrant-database-config.type';
import { ConfigService } from '@nestjs/config';
import { QdrantVectorStore } from '@langchain/qdrant';

const COLLECTION_NAME = 'rag_company_specific_collection';

export class QdrantVectorDBService implements VectorDatabase {
  private readonly logger = new Logger(QdrantVectorDBService.name);
  private vectorStore: VectorStore;

  constructor(private readonly configService: ConfigService) {}

  async init({ docs, embeddings }: DatabaseConfig): Promise<void> {
    this.logger.log(`QdrantVectorStoreService init called.`);

    const qdrantConfig = this.configService.get<QdrantDatabseConfig>('qdrant');
    if (!qdrantConfig) {
      throw new InternalServerErrorException(`Qdrant configuration not found.`);
    }
    const { apiKey, url } = qdrantConfig;

    const { QdrantClient } = await import('@qdrant/js-client-rest');
    const client = new QdrantClient({ apiKey, url });

    const { exists: isCollectionExists } =
      await client.collectionExists(COLLECTION_NAME);

    if (isCollectionExists) {
      const isDeleted = await client.deleteCollection(COLLECTION_NAME);
      if (!isDeleted)
        throw new InternalServerErrorException(
          `Unable to delete ${COLLECTION_NAME}`,
        );
      this.logger.log(
        `QdrantVectorStoreService deletes ${COLLECTION_NAME}. Result -> ${isDeleted}`,
      );
    }

    const size = (await embeddings.embedQuery('test')).length;
    const isSuccess = await client.createCollection(COLLECTION_NAME, {
      vectors: { size, distance: 'Cosine' },
    });

    if (!isSuccess)
      throw new InternalServerErrorException(
        `Unable to create collection ${COLLECTION_NAME}`,
      );

    this.vectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
      client,
      collectionName: COLLECTION_NAME,
    });
  }

  asRetriever(): VectorStoreRetriever<VectorStore> {
    return this.vectorStore.asRetriever();
  }
}
