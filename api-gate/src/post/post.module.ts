import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'post',
          protoPath: join(__dirname, '../../proto/post.proto'),
          url: '0.0.0.0:50051',
          loader: {
            keepCase: true,
            defaults: true,
            longs: String,
          },
        },
      },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
