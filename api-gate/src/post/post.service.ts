import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';

interface PostServiceGrpc {
  CreatePost(data: { title: string; content: string }): Observable<any>;
  GetPost(data: { id: string }): Observable<any>;
}

@Injectable()
export class PostService implements OnModuleInit {
  private postServiceGrpc!: PostServiceGrpc;

  constructor(@Inject('POST_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.postServiceGrpc =
      this.client.getService<PostServiceGrpc>('PostService');
  }

  async createPost(title: string, content: string) {
    return firstValueFrom(
      this.postServiceGrpc.CreatePost({ title, content }),
    );
  }

  async getPost(id: string) {
    return firstValueFrom(this.postServiceGrpc.GetPost({ id }));
  }
}
