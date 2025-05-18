import { Module } from '@nestjs/common';
import { RagTechBookService } from './application/rag-tech-book.service';
import { RagTechBookController } from './presenter/http/rag-tech-book.controller';
import { OpenaiModule } from 'src/openai/openai.module';
import { VectorStoreModule } from 'src/vector-store/vector-store.module';

@Module({
  imports: [OpenaiModule, VectorStoreModule.register('OPEN_AI', 'QDRANT')],
  providers: [RagTechBookService],
  controllers: [RagTechBookController],
})
export class RagTechBookModule {}
