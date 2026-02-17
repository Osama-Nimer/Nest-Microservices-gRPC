import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('CommentService', 'AddComment')
  addComment(data: { post_id: string; content: string }) {
    console.log('Received AddComment request with post_id:', data.post_id);
    return this.appService.addComment(data.post_id, data.content);
  }
  @GrpcMethod('CommentService', 'GetCommentsByPost')
  getCommentsByPost(data: { id: string }) {
    return this.appService.getCommentsByPost(data);
  }
}
