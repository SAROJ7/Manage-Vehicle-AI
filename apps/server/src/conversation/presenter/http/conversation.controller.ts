import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateConversationDto,
  CreateConversationWithMessageDto,
} from '../dto/conversation.dto';
import { ConversationService } from 'src/conversation/application/conversation.service';

@ApiTags('Conversation')
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}
  @Post()
  async create(@Body() createConversationDto) {
    return this.conversationService.createWithMessage(createConversationDto);
  }

  @Get()
  async findAll() {
    return this.conversationService.findAll();
  }

  @Delete(':id')
  async deleteConversation(@Param('id') id: string) {
    return this.conversationService.deleteConversation(id);
  }

  @Post(':id/message')
  async createMessage(@Param('id') id: string, @Body() createMessageDto) {
    return this.conversationService.createMessage(id, createMessageDto);
  }

  @Get(':id/message')
  async findMesssages(@Param('id') id: string) {
    return this.conversationService.findMessages(id);
  }
}
