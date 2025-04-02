"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tutor_controller_1 = require("../controllers/tutor.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const tutorRouter = express_1.default.Router();
tutorRouter.post('/cc', auth_middleware_1.authenticateUser, (0, auth_middleware_1.roleBasedAccess)(['tutor']), tutor_controller_1.TutorController.createNewCourse);
tutorRouter.post('/ccc', auth_middleware_1.authenticateUser, (0, auth_middleware_1.roleBasedAccess)(['tutor']), tutor_controller_1.TutorController.createNewCourseContent);
tutorRouter.delete('/delete/:id', auth_middleware_1.authenticateUser, (0, auth_middleware_1.roleBasedAccess)(['tutor']), tutor_controller_1.TutorController.removeCourseById);
tutorRouter.post('/cquiz', auth_middleware_1.authenticateUser, (0, auth_middleware_1.roleBasedAccess)(['tutor']), tutor_controller_1.TutorController.createNewQuiz);
tutorRouter.post('/cresult', auth_middleware_1.authenticateUser, (0, auth_middleware_1.roleBasedAccess)(['tutor']), tutor_controller_1.TutorController.createResult);
exports.default = tutorRouter;
