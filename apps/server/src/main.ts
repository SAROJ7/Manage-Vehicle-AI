import { appConfig } from './config';
import { Bootstrap } from './core';

async function bootstrap() {
  appConfig.rootPath = __dirname;
  console.log(`appConfig.rootPath in bootstrap ${appConfig.rootPath}`);

  const bootstrap = new Bootstrap();
  await bootstrap.initApp();
  bootstrap.enableCors();
  bootstrap.setupMiddleware();
  bootstrap.setupGloblaPipe();
  bootstrap.setupGlobalPrefix();
  bootstrap.swaggerSetup();

  return bootstrap.startApp();
}

bootstrap();
