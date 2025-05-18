import { Document } from '@langchain/core/documents';
import { Embeddings } from '@langchain/core/embeddings';
import { VectorDatabaseType } from './vector-database.type.js';

type VectorDatabseFactoryConfig = {
  docs: Document<Record<string, any>>[];
  type: VectorDatabaseType;
  embeddings: Embeddings;
};

export type DatabaseConfig = Omit<VectorDatabseFactoryConfig, 'type'>;
