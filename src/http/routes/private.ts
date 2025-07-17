import type { FastifyPluginCallback } from 'fastify';
import { authMiddleware } from '../../middleware/auth.js';
import { createQuestionRoute } from './create-question.js';
import { createRoomRoute } from './create-room.js';
import { getRoomQuestions } from './get-room-questions.js';
import { getRoomsRoute } from './get-rooms.js';
import { uploadAudioRoute } from './upload-audio.js';
import { logoutRoute } from './user/logout.js';
import { refreshRoute } from './user/refresh.js';

export const privateRoutes: FastifyPluginCallback = (app) => {
  app.addHook('preHandler', authMiddleware);
  app.register(createRoomRoute);
  app.register(createQuestionRoute);
  app.register(uploadAudioRoute);
  app.register(refreshRoute);
  app.register(logoutRoute);
  app.register(getRoomsRoute);
  app.register(getRoomQuestions);
};
