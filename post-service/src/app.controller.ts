import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import type { Post } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('PostService', 'GetPost')
  getPostGrpc(data: { id: string }): Post {
    return this.appService.getPost(data.id);
  }

  @GrpcMethod('PostService', 'CreatePost')
  createPostGrpc(data: { title: string; content: string }): Post {
    return this.appService.createPost(data.title, data.content);
  }
}
