"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const adminRouter = express_1.default.Router();
adminRouter.get('/view', auth_middleware_1.authenticateUser, (0, auth_middleware_1.roleBasedAccess)(['admin', 'Admin']), admin_controller_1.AdminController.viewAllUsers);
adminRouter.delete('/delete/:id', auth_middleware_1.authenticateUser, (0, auth_middleware_1.roleBasedAccess)(['admin', 'Admin']), admin_controller_1.AdminController.deleteUserById);
adminRouter.post('/add', auth_middleware_1.authenticateUser, (0, auth_middleware_1.roleBasedAccess)(['admin', 'Admin']), admin_controller_1.AdminController.addUser);
adminRouter.get('/paymentlist', auth_middleware_1.authenticateUser, (0, auth_middleware_1.roleBasedAccess)(['admin', 'Admin']), admin_controller_1.AdminController.checkPaymentList);
adminRouter.get('/enrolls', auth_middleware_1.authenticateUser, (0, auth_middleware_1.roleBasedAccess)(['admin', 'Admin']), admin_controller_1.AdminController.checkEnrollmentList);
exports.default = adminRouter;
