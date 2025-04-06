import express from 'express';
import { getAllCourses } from '../controllers/course.controller';
import { authenticateUser, roleBasedAccess } from '../middleware/auth.middleware';

const courseRouter=express.Router();


courseRouter.get('/getAllCourses', getAllCourses);

export default courseRouter;