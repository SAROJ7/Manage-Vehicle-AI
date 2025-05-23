import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AskDto } from '../dto/ask.dto';
import { RagTechBookService } from 'src/rag-tech-book/application/rag-tech-book.service';
import { toDivRow } from 'src/rag-tech-book/formatters/response-formatter';

@ApiTags('RAG')
@Controller('rag')
export class RagTechBookController {
  constructor(private readonly ragTechBookService: RagTechBookService) {}

  @ApiBody({
    description: 'An intance of AskDto',
    required: true,
    schema: {
      type: 'object',
      properties: {
        Query: {
          type: 'string',
          description: 'query',
        },
      },
    },
    examples: {
      routeInputData: {
        value: {
          query:
            'Please explain route data input bindings that is registered via withComponentInputBinding.',
        },
      },
      newControlFlow: {
        value: {
          query: 'What is the new control flow?',
        },
      },
    },
  })
  @ApiResponse({
    description: 'Generate answer in a rag aplication about technology book',
    type: String,
    status: HttpStatus.CREATED,
  })
  @Post()
  async ask(@Body() dto: AskDto): Promise<string> {
    const conversation = await this.ragTechBookService.ask(dto.query);
    return toDivRow(conversation);
  }
}
