import { Elysia } from 'elysia';
import { routes } from './routes';

const app = new Elysia()
  .get('/', () => ({
    name: 'Belajar Vibe Coding API',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      sample: '/api/sample',
      users: '/api/users',
    },
  }))
  .get('/health', () => ({
    status: 'OK',
    timestamp: new Date().toISOString(),
  }))
  .use(routes)
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname || 'localhost'}:${app.server?.port || 3000}`
);

export type App = typeof app;

