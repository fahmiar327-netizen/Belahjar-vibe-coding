import { Elysia, t } from 'elysia';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema';

export const userRoutes = new Elysia({ prefix: '/users' })
  .get('/', async ({ set }) => {
    try {
      const allUsers = await db.select().from(users);
      return {
        success: true,
        data: allUsers,
      };
    } catch (error: any) {
      set.status = 500;
      return {
        success: false,
        message: 'Gagal mengambil data users: ' + error.message,
      };
    }
  })
  .get(
    '/:id',
    async ({ params: { id }, set }) => {
      try {
        const found = await db.select().from(users).where(eq(users.id, Number(id)));
        if (!found.length) {
          set.status = 404;
          return {
            success: false,
            message: `User dengan ID ${id} tidak ditemukan`,
          };
        }
        return {
          success: true,
          data: found[0],
        };
      } catch (error: any) {
        set.status = 500;
        return {
          success: false,
          message: 'Gagal mengambil data user: ' + error.message,
        };
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .post(
    '/',
    async ({ body, set }) => {
      try {
        const result = await db.insert(users).values({
          name: body.name,
          email: body.email,
        });

        set.status = 201;
        return {
          success: true,
          message: 'User berhasil dibuat',
          data: {
            id: result[0].insertId,
            name: body.name,
            email: body.email,
          },
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          message: 'Gagal membuat user: ' + error.message,
        };
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1, error: 'Nama wajib diisi' }),
        email: t.String({ format: 'email', error: 'Format email tidak valid' }),
      }),
    }
  )
  .put(
    '/:id',
    async ({ params: { id }, body, set }) => {
      try {
        const existing = await db.select().from(users).where(eq(users.id, Number(id)));
        if (!existing.length) {
          set.status = 404;
          return {
            success: false,
            message: `User dengan ID ${id} tidak ditemukan`,
          };
        }

        await db
          .update(users)
          .set({
            ...(body.name ? { name: body.name } : {}),
            ...(body.email ? { email: body.email } : {}),
          })
          .where(eq(users.id, Number(id)));

        return {
          success: true,
          message: 'User berhasil diperbarui',
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          message: 'Gagal memperbarui user: ' + error.message,
        };
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: t.Object({
        name: t.Optional(t.String({ minLength: 1 })),
        email: t.Optional(t.String({ format: 'email' })),
      }),
    }
  )
  .delete(
    '/:id',
    async ({ params: { id }, set }) => {
      try {
        const existing = await db.select().from(users).where(eq(users.id, Number(id)));
        if (!existing.length) {
          set.status = 404;
          return {
            success: false,
            message: `User dengan ID ${id} tidak ditemukan`,
          };
        }

        await db.delete(users).where(eq(users.id, Number(id)));

        return {
          success: true,
          message: 'User berhasil dihapus',
        };
      } catch (error: any) {
        set.status = 500;
        return {
          success: false,
          message: 'Gagal menghapus user: ' + error.message,
        };
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
