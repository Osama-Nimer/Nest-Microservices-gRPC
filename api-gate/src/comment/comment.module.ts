import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMENT_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'comment',
          protoPath: join(__dirname, '../../proto/comment.proto'),
          url: '0.0.0.0:50052',
          loader: {
            keepCase: true,
            defaults: true,
            longs: String,
          },
        },
      },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
