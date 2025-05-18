import { ChatOpenAI } from '@langchain/openai';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { OPENAI_CHAT_MODEL } from 'src/openai/application/constants/openai.constant';
import { VectorStoreService } from 'src/vector-store/application/vector-store.service';
import { createContextualQuestion } from './chat-with-history/create-contextual-chain';
import {
  Runnable,
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';
import { formatDocumentsAsString } from 'langchain/util/document';
import { qaPrompt } from './constant/prompt.constant';
import { BaseMessage } from '@langchain/core/messages';
import { ConversationContent } from './type/conversation-content.type';

@Injectable()
export class RagTechBookService {
  private chat_history: BaseMessage[] = [];
  constructor(
    @Inject(OPENAI_CHAT_MODEL) private readonly model: ChatOpenAI,
    private readonly vectorStoreService: VectorStoreService,
  ) {}

  async ask(question: string): Promise<ConversationContent[]> {
    const contextualizedQuestion = createContextualQuestion(this.model);
    const retriever = this.vectorStoreService.asRetriever();

    try {
      const ragChain = RunnableSequence.from([
        RunnablePassthrough.assign({
          context: (input: Record<string, any>) => {
            if ('chat_history' in input) {
              const chain = contextualizedQuestion(input);
              return (chain as Runnable)
                .pipe(retriever)
                .pipe(formatDocumentsAsString);
            }
            return '';
          },
        }),
        qaPrompt,
        this.model,
      ]);

      const aiMessage = await ragChain.invoke({
        question,
        chat_history: this.chat_history,
      });

      this.chat_history = this.chat_history.concat(aiMessage);
      if (this.chat_history.length > 10) {
        this.chat_history.shift();
      }

      return [
        {
          role: 'Human',
          content: question,
        },
        {
          role: 'Assistant',
          content: (aiMessage.content as string) || '',
        },
      ];
    } catch (error) {
      console.error({ error });
      throw new InternalServerErrorException(error);
    }
  }
}
