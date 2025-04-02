import express from 'express';
import { StudentController } from '../controllers/student.controller';
import { authenticateUser, roleBasedAccess } from '../middleware/auth.middleware';

const studentRouter=express.Router();

studentRouter.post('/enroll',authenticateUser, roleBasedAccess(['student']),StudentController.enroll);
studentRouter.get('/getenrolled/:id',authenticateUser, roleBasedAccess(['student']), StudentController.getEnrolledCourses)
studentRouter.get('/getresult/:id',authenticateUser, roleBasedAccess(['student']), StudentController.getStudentResult)
studentRouter.get('/getpaylist/:id', authenticateUser, roleBasedAccess(['student']), StudentController.getStudentResult)
export default studentRouter;