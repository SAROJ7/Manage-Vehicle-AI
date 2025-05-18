import { Module } from '@nestjs/common';
import { RagTechBookModule } from 'src/rag-tech-book/rag-tech-book.module';
import { ConversationService } from './application/conversation.service';
import { ConversationController } from './presenter/http/conversation.controller';

@Module({
  imports: [RagTechBookModule],
  providers: [ConversationService],
  controllers: [ConversationController],
})
export class ConversationModule {}
