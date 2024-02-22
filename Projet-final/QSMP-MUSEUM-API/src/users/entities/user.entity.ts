import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Importer uuidv4 pour générer un UUID
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string; // Champ UUID

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

  // Générer un UUID avant l'insertion en base de données
  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }
}
