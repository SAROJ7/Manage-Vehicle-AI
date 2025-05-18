import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum MessageRole {
  USER = 'User',
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
