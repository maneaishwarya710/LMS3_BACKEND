"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controllers/student.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const studentRouter = express_1.default.Router();
studentRouter.post('/enroll', auth_middleware_1.authenticateUser, (0, auth_middleware_1.roleBasedAccess)(['student']), student_controller_1.StudentController.enroll);
studentRouter.get('/getenrolled/:id', auth_middleware_1.authenticateUser, (0, auth_middleware_1.roleBasedAccess)(['student']), student_controller_1.StudentController.getEnrolledCourses);
studentRouter.get('/getresult/:id', auth_middleware_1.authenticateUser, (0, auth_middleware_1.roleBasedAccess)(['student']), student_controller_1.StudentController.getStudentResult);
studentRouter.get('/getpaylist/:id', auth_middleware_1.authenticateUser, (0, auth_middleware_1.roleBasedAccess)(['student']), student_controller_1.StudentController.getStudentResult);
exports.default = studentRouter;
