import { authMiddleware } from '../../middleware/auth.ts';
import { createQuestionRoute } from './create-question.ts';
import { createRoomRoute } from './create-room.ts';
import { getRoomQuestions } from './get-room-questions.ts';
import { getRoomsRoute } from './get-rooms.ts';
import { uploadAudioRoute } from './upload-audio.ts';
import { logoutRoute } from './user/logout.ts';
import { refreshRoute } from './user/refresh.ts';
export const privateRoutes = (app) => {
    app.addHook('preHandler', authMiddleware);
    app.register(createRoomRoute);
    app.register(createQuestionRoute);
    app.register(uploadAudioRoute);
    app.register(refreshRoute);
    app.register(logoutRoute);
    app.register(getRoomsRoute);
    app.register(getRoomQuestions);
};
