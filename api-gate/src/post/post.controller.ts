import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() body: { title: string; content: string }) {
    return this.postService.createPost(body.title, body.content);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postService.getPost(id);
  }
}
