import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'post',
        protoPath: join(__dirname, '../proto/post.proto'),
        url: '0.0.0.0:50051',
        loader: {
          keepCase: true,
          defaults: true,
          longs: String,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
