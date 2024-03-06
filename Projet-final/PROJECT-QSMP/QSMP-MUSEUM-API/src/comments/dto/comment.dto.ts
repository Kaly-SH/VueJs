import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  artworkId: number;
}

export class CommentDto {
  id: number;
  content: string;
  userId: number;
  artworkId: number;
}
