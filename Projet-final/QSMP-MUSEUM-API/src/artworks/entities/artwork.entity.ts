import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Character } from '../../characters/entities/character.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Artwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  artworkLink: string;

  @ManyToMany(() => Character)
  @JoinTable()
  characters: Character[];

  @Column()
  artistName: string;

  @Column()
  publicationDate: Date;

  @Column()
  description: string;

  @Column({ default: 0 })
  likeCount: number;

  @Column({ default: false })
  displayedInMuseum: boolean;

  @OneToMany(() => Comment, (comment) => comment.artwork)
  comments: Comment[];
}
