import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';

interface CommentServiceGrpc {
  AddComment(data: { post_id: string; content: string }): Observable<any>;
  GetCommentsByPost(data: { id: string }): Observable<any>;
}

@Injectable()
export class CommentService implements OnModuleInit {
  private commentServiceGrpc!: CommentServiceGrpc;

  constructor(@Inject('COMMENT_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.commentServiceGrpc =
      this.client.getService<CommentServiceGrpc>('CommentService');
  }

  async addComment(post_id: string, content: string) {
    return firstValueFrom(
      this.commentServiceGrpc.AddComment({ post_id, content }),
    );
  }

  async getCommentsByPost(postId: string) {
    return firstValueFrom(
      this.commentServiceGrpc.GetCommentsByPost({ id: postId }),
    );
  }
}
