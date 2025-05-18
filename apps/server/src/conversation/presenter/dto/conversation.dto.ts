import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum MessageRole {
  HUMAN = 'Human',
  ASSISTANT = 'Assistant',
  SYSTEM = 'System',
}

export class CreateMessageDto {
  @ApiProperty({ description: 'Message content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'Message role', enum: MessageRole })
  @IsEnum(MessageRole)
  role: MessageRole;

  @ApiPropertyOptional({ description: 'Message metadata' })
  @IsOptional()
  metadata?: any;
}

export class CreateConversationDto {
  @ApiPropertyOptional({ description: 'Title of the conversation' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'User ID who owns the conversation' })
  @IsOptional()
  @IsUUID()
  userId?: string;
}

export class CreateConversationWithMessageDto {
  @ApiPropertyOptional({ description: 'Title of the conversation' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'User ID who owns the conversation' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({
    description: 'Initial message for the conversation',
    type: CreateMessageDto,
  })
  @ValidateNested()
  @Type(() => CreateMessageDto)
  @IsNotEmpty()
  message: CreateMessageDto;
}
