import express from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authenticateUser, roleBasedAccess } from '../middleware/auth.middleware';

const adminRouter=express.Router();

adminRouter.get('/view', authenticateUser, roleBasedAccess(['admin','Admin']), AdminController.viewAllUsers);
adminRouter.delete('/delete/:id',authenticateUser, roleBasedAccess(['admin','Admin']), AdminController.deleteUserById);
adminRouter.post('/add',authenticateUser, roleBasedAccess(['admin','Admin']), AdminController.addUser)
adminRouter.get('/paymentlist',authenticateUser, roleBasedAccess(['admin','Admin']), AdminController.checkPaymentList)
adminRouter.get('/enrolls', authenticateUser, roleBasedAccess(['admin','Admin']), AdminController.checkEnrollmentList)

export default adminRouter;