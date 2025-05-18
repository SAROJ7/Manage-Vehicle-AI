import { Module } from '@nestjs/common';
import { OpenaiChatModelProvider } from './application/providers/open-chat-model.provider';
import { OpenaiService } from './application/openai.service';
import { OpenaiController } from './presenter/http/openai.controller';

@Module({
  providers: [OpenaiChatModelProvider, OpenaiService],
  exports: [OpenaiChatModelProvider],
  controllers: [OpenaiController],
})
export class OpenaiModule {}
