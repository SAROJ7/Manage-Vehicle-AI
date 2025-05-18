import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  MANAGE_VEHICLE_GUIDE,
  TEXT_EMBEDDING_MODEL,
  VECTOR_DATABASE,
} from './constant/rag.constant';
import { Embeddings } from '@langchain/core/embeddings';
import * as vectorDatabaseInterface from './interface/vector-database.interface';
import * as path from 'path';
import { appConfig } from 'src/config';
import { loadPdf } from './loaders/pdf-loader';
import {
  VectorStore,
  VectorStoreRetriever,
} from '@langchain/core/vectorstores';

@Injectable()
export class VectorStoreService {
  private readonly logger = new Logger(VectorStoreService.name);

  constructor(
    @Inject(TEXT_EMBEDDING_MODEL) private readonly embeddings: Embeddings,
    @Inject(VECTOR_DATABASE)
    private readonly dbService: vectorDatabaseInterface.VectorDatabase,
  ) {
    void this.createDatabase(embeddings, this.dbService);
  }

  private async createDatabase(
    embeddings: Embeddings,
    dbService: vectorDatabaseInterface.VectorDatabase,
  ) {
    const docs = await this.loadDocuments();
    await dbService.init({ docs, embeddings });
  }

  private async loadDocuments() {
    const bookFullPath = path.join(appConfig.rootPath, MANAGE_VEHICLE_GUIDE);
    const docs = await loadPdf(bookFullPath);
    this.logger.log(`number of docs -> ${docs.length}`);
    return docs;
  }

  asRetriever(): VectorStoreRetriever<VectorStore> {
    this.logger.log(`return vector retriever`);
    return this.dbService.asRetriever();
  }
}
