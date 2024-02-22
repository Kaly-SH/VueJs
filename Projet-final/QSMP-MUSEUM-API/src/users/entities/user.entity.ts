import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pseudo: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  twitchPseudo: string;

  @Column({ nullable: true })
  role: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
