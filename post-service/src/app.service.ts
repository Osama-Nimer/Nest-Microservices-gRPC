import { Injectable } from '@nestjs/common';

export interface Post {
  id: number;
  title: string;
  content: string;
}

@Injectable()
export class AppService {
  private posts: Post[] = [];

  createPost(title: string, content: string): Post {
    const post: Post = {
      id: this.posts.length + 1,
      title,
      content,
    };
    this.posts.push(post);
    return post;
  }

  getPost(id: number): Post {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }
}
