import { ConfigService } from '@nestjs/config';
import { VectorDatabaseType } from '../type/vector-database.type';
import { MemoryVectorDBService } from './memory-vector-db.service';
import { QdrantVectorDBService } from './qdrant-vector-db.service';
import { InternalServerErrorException } from '@nestjs/common';

export function createVectorDatabse(
  type: VectorDatabaseType,
  configService: ConfigService,
) {
  if (type === 'MEMORY') {
    return new MemoryVectorDBService();
  } else if (type === 'QDRANT') {
    return new QdrantVectorDBService(configService);
  }

  throw new InternalServerErrorException(
    `Invalid vector store type: ${type as string}`,
  );
}
