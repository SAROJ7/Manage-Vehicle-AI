import { MessageContent } from '@langchain/core/messages';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OpenaiService } from 'src/openai/application/openai.service';

@ApiTags('Openai Chain')
@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Get()
  @ApiResponse({
    description: 'The AI message of OpenAI Chat Model',
    type: String,
    status: HttpStatus.OK,
  })
  testchain(): Promise<MessageContent> {
    return this.openaiService.generateText(
      'Explain me about the manage vehicle application.',
    );
  }
}
