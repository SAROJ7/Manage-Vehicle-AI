import { ValidationPipe } from '@nestjs/common';

export const validateConfig = new ValidationPipe({
  whitelist: true,
  transform: true,
  stopAtFirstError: true,
  forbidUnknownValues: true,
});
