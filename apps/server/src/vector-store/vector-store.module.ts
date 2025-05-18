import { DynamicModule, Module } from '@nestjs/common';
import { VectorStoreService } from './application/vector-store.service';
import { VectorStoreController } from './presenter/http/vector-store.controller';
import {
  TEXT_EMBEDDING_MODEL,
  VECTOR_DATABASE,
  VECTOR_STORE_TYPE,
} from './application/constant/rag.constant';
import { ConfigService } from '@nestjs/config';
import { createTextEmbeddingModel } from './application/embedding/create-embedding-model';
import { EmbeddingModels } from './application/type/embedding-model.type';
import { VectorDatabaseType } from './application/type/vector-database.type';
import { VectorStoreTestService } from './application/vector-store.test.service';
import { MemoryVectorDBService } from './application/vector-database/memory-vector-db.service';
import { QdrantVectorDBService } from './application/vector-database/qdrant-vector-db.service';
import { createVectorDatabse } from './application/vector-database/create-vector-database';

@Module({
  providers: [
    VectorStoreService,
    VectorStoreTestService,
    MemoryVectorDBService,
    QdrantVectorDBService,
  ],
  controllers: [VectorStoreController],
  exports: [VectorStoreService],
})
export class VectorStoreModule {
  static register(
    embeddingModel: EmbeddingModels,
    vectorStoreType: VectorDatabaseType,
  ): DynamicModule {
    return {
      module: VectorStoreModule,
      providers: [
        {
          provide: TEXT_EMBEDDING_MODEL,
          useFactory: (configService: ConfigService) => {
            return createTextEmbeddingModel(configService, embeddingModel);
          },
          inject: [ConfigService],
        },
        {
          provide: VECTOR_STORE_TYPE,
          useValue: vectorStoreType,
        },
        {
          provide: VECTOR_DATABASE,
          useFactory: (type: VectorDatabaseType, configServie: ConfigService) =>
            createVectorDatabse(type, configServie),
          inject: [VECTOR_STORE_TYPE, ConfigService],
        },
      ],
    };
  }
}
