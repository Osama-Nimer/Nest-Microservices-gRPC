import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import type { Post } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('PostService', 'CreatePost')
  createPost(data: { title: string; content: string }): Post {
    return this.appService.createPost(data.title, data.content);
  }

  @GrpcMethod('PostService', 'GetPost')
  getPost(data: { id: number }): Post {
    return this.appService.getPost(data.id);
  }
}
