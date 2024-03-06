// comments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto, CommentDto } from '../dto/comment.dto';
import { User } from 'src/users/entities/user.entity';
import { Artwork } from 'src/artworks/entities/artwork.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User) // Injecter le repository de l'entité User
    private readonly userRepository: Repository<User>,
    @InjectRepository(Artwork) // Injecter le repository de l'entité Artwork
    private readonly artworkRepository: Repository<Artwork>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<CommentDto> {
    const { content, userId, artworkId } = createCommentDto;

    // Vérifier si l'utilisateur existe
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    // Vérifier si l'artwork existe
    const artwork = await this.artworkRepository.findOne({
      where: { id: artworkId },
    });
    if (!artwork) {
      throw new NotFoundException(`Artwork with ID "${artworkId}" not found`);
    }

    const newComment = this.commentRepository.create({
      content,
      user, // Utiliser l'entité User récupérée
      artwork, // Utiliser l'entité Artwork récupérée
    });
    await this.commentRepository.save(newComment);
    return this.mapToDto(newComment);
  }

  async findAllComments(): Promise<CommentDto[]> {
    const comments = await this.commentRepository.find();
    return comments.map(this.mapToDto);
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
