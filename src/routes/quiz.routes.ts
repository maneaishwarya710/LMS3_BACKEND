import express from 'express';
import { createQuiz, getQuizByCourseId, getResultsByUserId, submitQuiz } from '../controllers/quiz.controller';
import { authenticateUser, roleBasedAccess } from '../middleware/auth.middleware';

const quizRouter=express.Router();

quizRouter.post('/newCreateQuiz',authenticateUser, roleBasedAccess(['tutor']), createQuiz);
quizRouter.get('/getQuizByCourseId/:courseId', getQuizByCourseId);
quizRouter.post('/submitQuiz', submitQuiz);
quizRouter.get('/getResultByUserId/:userId', getResultsByUserId);

export default quizRouter;