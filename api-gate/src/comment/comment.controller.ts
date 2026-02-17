import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async addComment(
    @Param('postId') postId: string,
    @Body() body: { content: string },
  ) {
    return this.commentService.addComment(postId, body.content);
  }

  @Get()
  async getCommentsByPost(@Param('postId') postId: string) {
    return this.commentService.getCommentsByPost(postId);
  }
}
