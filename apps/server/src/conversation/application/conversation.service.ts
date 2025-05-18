import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RagTechBookService } from 'src/rag-tech-book/application/rag-tech-book.service';
import {
  CreateConversationWithMessageDto,
  CreateMessageDto,
} from '../presenter/dto/conversation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(
    private readonly ragTechBookService: RagTechBookService,
    private readonly prismaService: PrismaService,
  ) {}

  async createWithMessage(dto: CreateConversationWithMessageDto) {
    const conversation = await this.prismaService.conversation.create({
      data: {
        title: dto.title,
        userId: dto.userId,
        messages: {
          create: {
            role: dto.message.role,
            content: dto.message.content,
          },
        },
      },
    });

    const response = await this.ragTechBookService.ask(dto.message.content);

    if (!response)
      throw new InternalServerErrorException(`Request to LLM Failed`);
    return this.prismaService.conversation.update({
      where: {
        id: conversation.id,
      },
      data: {
        messages: {
          create: {
            content: response[1]?.content || 'Hello',
            role: response[1]?.role || 'Assistant',
          },
        },
      },
    });
  }

  async findAll() {
    return this.prismaService.conversation.findMany({
      include: { messages: { take: 2 } },
    });
  }

  async createMessage(id: string, createMessage: CreateMessageDto) {
    const conversation = await this.prismaService.conversation.findUnique({
      where: { id },
    });
    if (!conversation) throw new NotFoundException(`Conversation not found`);

    await this.prismaService.message.create({
      data: {
        role: createMessage.role,
        content: createMessage.content,
        metadata: createMessage.metadata,
        conversation: {
          connect: { id },
        },
      },
    });

    const response = await this.ragTechBookService.ask(createMessage.content);

    if (!response)
      throw new InternalServerErrorException(`Request to LLM Failed`);
    return this.prismaService.conversation.update({
      where: {
        id,
      },
      data: {
        messages: {
          create: {
            content: response[1]?.content || 'Hello',
            role: response[1]?.role || 'Assistant',
          },
        },
      },
    });
  }

  async findMessages(id: string) {
    return this.prismaService.message.findMany({
      where: { conversationId: id },
      orderBy: { createdAt: 'asc' },
    });
  }

  async deleteConversation(id: string) {
    return this.prismaService.conversation.delete({
      where: { id },
    });
  }
}
