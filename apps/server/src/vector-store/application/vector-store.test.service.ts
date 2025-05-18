import { Inject, Injectable } from '@nestjs/common';
import { TEXT_EMBEDDING_MODEL } from './constant/rag.constant';
import { Embeddings } from '@langchain/core/embeddings';
import { VectorStoreService } from './vector-store.service';

@Injectable()
export class VectorStoreTestService {
  constructor(
    @Inject(TEXT_EMBEDDING_MODEL) private readonly embeddings: Embeddings,
    private vectorStoreService: VectorStoreService,
  ) {}

  async textEmbedding(): Promise<number[]> {
    return this.embeddings.embedQuery(
      `Register embedding model in NestJS is ok`,
    );
  }

  testRetriever() {
    return this.vectorStoreService.asRetriever();
  }
}
