import { ConfigService } from '@nestjs/config';
import { OpenAIEmbeddings } from '@langchain/openai';
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';
import { Embeddings } from '@langchain/core/embeddings';
import { InternalServerErrorException } from '@nestjs/common';
import { EmbeddingModelConfig } from '../type/embedding-model-config.type';
import { EmbeddingModels } from '../type/embedding-model.type';

function createOpenAiTextEmbeddingModel(configService: ConfigService) {
  const { apiKey, embeddingModel: model } =
    configService.get<EmbeddingModelConfig>('openai')!;
  return new OpenAIEmbeddings({
    apiKey,
    model,
  });
}

function createHuggingfaceInferenceEmbeddingModel(
  configService: ConfigService,
) {
  const { apiKey, embeddingModel: model } =
    configService.get<EmbeddingModelConfig>('huggingface')!;

  return new HuggingFaceInferenceEmbeddings({
    apiKey,
    model,
  });
}

export function createTextEmbeddingModel(
  configService: ConfigService,
  embeddingModel: EmbeddingModels,
): Embeddings {
  if (embeddingModel == 'OPEN_AI') {
    return createOpenAiTextEmbeddingModel(configService);
  } else if (embeddingModel == 'HUGGINGFACE_INFERENCE') {
    return createHuggingfaceInferenceEmbeddingModel(configService);
  } else {
    throw new InternalServerErrorException(`Invalid Type of embedding model`);
  }
}
