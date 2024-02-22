// comments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto, CommentDto } from '../dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<CommentDto> {
    const { content, userId, artworkId } = createCommentDto;
    const newComment = this.commentRepository.create({
      content,
      user: { id: userId }, // Utiliser l'ID de l'utilisateur pour créer la relation
      artwork: { id: artworkId }, // Utiliser l'ID de l'œuvre pour créer la relation
    });
    await this.commentRepository.save(newComment);
    return this.mapToDto(newComment);
  }

  async findOneComment(id: number): Promise<CommentDto> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }
    return this.mapToDto(comment);
  }

  async findCommentsByArtworkId(artworkId: number): Promise<CommentDto[]> {
    const comments = await this.commentRepository.find({
      where: { artwork: { id: artworkId } },
    }); // Utiliser l'ID de l'œuvre pour filtrer
    return comments.map(this.mapToDto);
  }

  async removeComment(id: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }
    await this.commentRepository.remove(comment);
  }

  private mapToDto(comment: Comment): CommentDto {
    const { id, content, user, artwork } = comment;
    return { id, content, userId: user.id, artworkId: artwork.id }; // Utiliser user.id et artwork.id pour récupérer les ID
  }
}
