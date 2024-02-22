import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Artwork } from '../../artworks/entities/artwork.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  streamerName: string;

  @Column()
  type: string;

  @ManyToMany(() => Artwork)
  @JoinTable()
  artworks: Artwork[];
}
