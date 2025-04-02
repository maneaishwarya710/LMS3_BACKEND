import express from 'express';
import { TutorController } from '../controllers/tutor.controller';
import { authenticateUser, roleBasedAccess } from '../middleware/auth.middleware';

const tutorRouter=express.Router();

tutorRouter.post('/cc', authenticateUser, roleBasedAccess(['tutor']), TutorController.createNewCourse);
tutorRouter.post('/ccc', authenticateUser, roleBasedAccess(['tutor']), TutorController.createNewCourseContent);
tutorRouter.delete('/delete/:id', authenticateUser, roleBasedAccess(['tutor']), TutorController.removeCourseById);
tutorRouter.post('/cquiz', authenticateUser, roleBasedAccess(['tutor']), TutorController.createNewQuiz);
tutorRouter.post('/cresult', authenticateUser, roleBasedAccess(['tutor']), TutorController.createResult);

export default tutorRouter;