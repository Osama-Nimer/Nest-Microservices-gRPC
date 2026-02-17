import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'post',
          protoPath: join(__dirname, '../proto/post.proto'),
          url: '0.0.0.0:50051',
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
