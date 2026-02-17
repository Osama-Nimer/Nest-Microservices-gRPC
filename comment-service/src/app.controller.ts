import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('CommentService', 'AddComment')
  addComment(data: { postId: string; content: string }) {
    console.log('Received AddComment request with postId:', data.postId);
    return this.appService.addComment(data.postId, data.content);
  }
  @GrpcMethod('CommentService', 'GetCommentsByPost')
  getCommentsByPost(data: { id: string }) {
    return this.appService.getCommentsByPost(data);
  }
}
