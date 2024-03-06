import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Artwork } from './artworks/entities/artwork.entity';
import { Character } from './characters/entities/character.entity';
import { Comment } from './comments/entities/comment.entity';
import { ArtworksModule } from './artworks/artworks.module';
import { CharactersModule } from './characters/characters.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [User, Artwork, Character, Comment],
        synchronize: true,
        extra: {
          ssl: configService.get('POSTGRES_SSL') === 'true',
        },
      }),
      inject: [ConfigService],
    } as TypeOrmModuleAsyncOptions),
    UsersModule,
    ArtworksModule,
    CharactersModule,
    CommentsModule,
  ],
})
export class AppModule {}
