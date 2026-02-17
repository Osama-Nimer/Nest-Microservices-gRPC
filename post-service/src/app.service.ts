import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { randomUUID } from 'crypto';

export interface Post {
  id: string;
  title: string;
  content: string;
}

@Injectable()
export class AppService {
  private posts: Post[] = [];

  createPost(title: string, content: string): Post {
    const post: Post = {
      id: randomUUID(),
      title: title,
      content: content,
    };
    this.posts.push(post);
    return post;
  }

  getPost(id: string): Post {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new RpcException({
        message: `Post with ID ${id} not found`,
      });
    }
    return post;
  }
}
