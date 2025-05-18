import { Inject, Injectable } from '@nestjs/common';
import { OPENAI_CHAT_MODEL } from './constants/openai.constant';
import { ChatOpenAI } from '@langchain/openai';
import { MessageContent } from '@langchain/core/messages';
import { ChatPromptTemplate } from '@langchain/core/prompts';

@Injectable()
export class OpenaiService {
  constructor(@Inject(OPENAI_CHAT_MODEL) private readonly model: ChatOpenAI) {}

  async generateText(input: string): Promise<MessageContent> {
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are a helpful assistant'],
      ['human', '{input}'],
    ]);

    const chain = prompt.pipe(this.model);

    const response = await chain.invoke({
      input,
    });

    return response.content;
  }
}
