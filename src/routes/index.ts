import { Elysia } from 'elysia';
import { userRoutes } from './users';

export const routes = new Elysia({ prefix: '/api' })
  .get('/sample', () => ({
    message: 'Sample Endpoint API Belajar Vibe Coding',
    timestamp: new Date().toISOString(),
  }))
  .use(userRoutes);
