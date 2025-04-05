"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quiz_controller_1 = require("../controllers/quiz.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const quizRouter = express_1.default.Router();
quizRouter.post('/newCreateQuiz', auth_middleware_1.authenticateUser, (0, auth_middleware_1.roleBasedAccess)(['tutor']), quiz_controller_1.createQuiz);
quizRouter.get('/getQuizByCourseId/:courseId', quiz_controller_1.getQuizByCourseId);
quizRouter.post('/submitQuiz', quiz_controller_1.submitQuiz);
quizRouter.get('/getResultByUserId/:userId', quiz_controller_1.getResultsByUserId);
exports.default = quizRouter;
