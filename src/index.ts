import { Elysia } from 'elysia';
import { db } from './db';
import { users } from './db/schema';

const app = new Elysia()
  .get('/', () => 'Hello Elysia!')
  .get('/health', () => {
    return { status: 'OK', timestamp: new Date().toISOString() };
  })
  .get('/api/sample', async () => {
    const allUsers = await db.select().from(users);
    return {
      message: 'Sample Endpoint using Drizzle ORM',
      data: allUsers,
    };
  })
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
