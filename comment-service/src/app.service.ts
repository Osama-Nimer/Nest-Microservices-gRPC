import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { RpcException, type ClientGrpc } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
import { randomUUID } from 'crypto';
interface PostService {
  GetPost(data: { id: string }): Observable<any>;
}

export interface Comment {
  id: string;
  post_id: string;
  content: string;
}

@Injectable()
export class AppService implements OnModuleInit {
  private postService!: PostService;
  private comments: Comment[] = [];

  constructor(@Inject('POST_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    // Try lowercase 'g' if Uppercase 'G' is failing
    this.postService = this.client.getService<PostService>('PostService');
  }

  async addComment(postId: string, content: string) {
    console.log(
      'Received AddComment request with postId:',
      postId,
      'and content:',
      content,
    );

    try {
      const post = await firstValueFrom(
        this.postService.GetPost({ id: postId }),
      );

      const commentInternal = {
        id: randomUUID(),
        post_id: post.id,
        content,
      };

      this.comments.push(commentInternal);

      return {
        id: commentInternal.id,
        post_id: commentInternal.post_id,
        content: commentInternal.content,
      };
    } catch (e: any) {
      console.error('Remote call to PostService failed:', e.details);
      throw new RpcException('Dependency Service Error');
    }
  }

  getCommentsByPost(data: { id: string }) {
    const filtered = this.comments.filter((c) => c.post_id === data.id);

    console.log(
      `Searching for comments with PostID: ${data.id}. Found: ${filtered.length}`,
    );

    console.log('Filtered comments:', filtered);

    return { comments: filtered };
  }
}
