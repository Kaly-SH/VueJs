import { Controller, Post, Body, Param, Get, Delete, NotFoundException } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CreateCommentDto, CommentDto } from '../dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentDto> {
    return this.commentsService.createComment(createCommentDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CommentDto> {
    try {
      return this.commentsService.findOneComment(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Comment not found');
      }
      throw error; // Rethrow other errors
    }
  }

  @Get('artwork/:artworkId')
  async findByArtworkId(
    @Param('artworkId') artworkId: number,
  ): Promise<CommentDto[]> {
    return this.commentsService.findCommentsByArtworkId(artworkId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.commentsService.removeComment(id);
  }
}
