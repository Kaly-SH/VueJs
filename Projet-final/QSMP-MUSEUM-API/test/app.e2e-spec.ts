import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app;
  let createdUserId: number;
  let createdCharacterId: number;
  let createdArtworkId: number;
  let createdCommentId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send({ pseudo: 'test', email: 'test@example.com', password: 'password' })
      .expect(201);
    createdUserId = res.body.id;
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it('/users/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/users/${createdUserId}`)
      .expect(200);
  });

  it('/users/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put(`/users/${createdUserId}`)
      .send({ pseudo: 'newTest' })
      .expect(200);
  });

  it('/users/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/users/${createdUserId}`)
      .expect(200);
  });

  it('/characters (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/characters')
      .send({
        name: 'characterName',
        streamerName: 'streamerName',
        type: 'type',
      })
      .expect(201);
    createdCharacterId = res.body.id;
  });

  it('/characters (GET)', () => {
    return request(app.getHttpServer()).get('/characters').expect(200);
  });

  it('/characters/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/characters/${createdCharacterId}`)
      .expect(200);
  });

  it('/characters/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put(`/characters/${createdCharacterId}`)
      .send({ name: 'newCharacterName' })
      .expect(200);
  });

  it('/characters/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/characters/${createdCharacterId}`)
      .expect(200);
  });

  it('/artworks (GET)', () => {
    return request(app.getHttpServer()).get('/artworks').expect(200);
  });

  it('/artworks (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/artworks')
      .send({
        artworkLink: 'artworkLink',
        artistName: 'artistName',
        description: 'description',
      })
      .expect(201);
    createdArtworkId = res.body.id;
  });

  it('/artworks/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/artworks/${createdArtworkId}`)
      .expect(200);
  });

  it('/artworks/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put(`/artworks/${createdArtworkId}`)
      .send({ artistName: 'newArtistName' })
      .expect(200);
  });

  it('/artworks/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/artworks/${createdArtworkId}`)
      .expect(200);
  });

  it('/users (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send({ pseudo: 'test', email: 'test@example.com', password: 'password' })
      .expect(201);
    createdUserId = res.body.id;
  });

  it('/artworks (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/artworks')
      .send({
        artworkLink: 'artworkLink',
        artistName: 'artistName',
        description: 'description',
      })
      .expect(201);
    createdArtworkId = res.body.id;
  });

  it('/comments (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/comments')
      .send({
        content: 'commentContent',
        userId: createdUserId,
        artworkId: createdArtworkId,
      })
      .expect(201);
    createdCommentId = res.body.id; // Stocker l'ID du commentaire créé dans la variable
  });

  it('/comments/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/comments/${createdCommentId}`)
      .expect(200);
  });

  it('/comments/artwork/:artworkId (GET)', () => {
    return request(app.getHttpServer())
      .get(`/comments/artwork/${createdArtworkId}`)
      .expect(200);
  });

  it('/users/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/users/${createdUserId}`)
      .expect(200);
  });

  it('/artworks/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/artworks/${createdArtworkId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
