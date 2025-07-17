import { count, eq } from 'drizzle-orm';
import { db } from '../../db/connection.js';
import { schema } from '../../db/schema/index.js';
export const getRoomsRoute = (app) => {
    app.get('/rooms', async () => {
        const results = await db
            .select({
            id: schema.rooms.id,
            name: schema.rooms.name,
            createdAt: schema.rooms.createdAt,
            questionsCount: count(schema.questions.id),
        })
            .from(schema.rooms)
            .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))
            .groupBy(schema.rooms.id)
            .orderBy(schema.rooms.createdAt);
        return results;
    });
};
