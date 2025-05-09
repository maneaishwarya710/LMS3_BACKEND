"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResultsByUserId = exports.submitQuiz = exports.getQuizByCourseId = exports.createQuiz = void 0;
const quiz_service_1 = require("../services/quiz.service");
const quizService = new quiz_service_1.QuizService();
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quizData, questions } = req.body;
        // Validate input
        if (!quizData || !questions || !Array.isArray(questions)) {
            res.status(400).json({ message: 'Invalid input: quizData and questions are required' });
        }
        const quiz = yield quizService.createQuiz(quizData, questions);
        console.log("In createQuiz controller:", quiz);
        res.status(201).json(quiz);
    }
    catch (error) {
        console.error(`Error creating quiz:`, error);
        res.status(500).json({ message: 'Error creating quiz', error });
    }
});
exports.createQuiz = createQuiz;
const getQuizByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = Number(req.params.courseId);
        // Validate courseId
        if (isNaN(courseId)) {
            res.status(400).json({ message: 'Invalid courseId parameter' });
        }
        const quizzes = yield quizService.getQuizByCourseId(courseId);
        console.log("In getQuizByCourseId controller:", quizzes);
        res.status(200).json(quizzes);
    }
    catch (error) {
        console.error(`Error retrieving quizzes for courseId ${req.params.courseId}:`, error);
        res.status(500).json({ message: 'Error retrieving quizzes', error });
    }
});
exports.getQuizByCourseId = getQuizByCourseId;
const submitQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { attemptData, answers } = req.body;
        const attempt = yield quizService.submitQuiz(attemptData, answers);
        res.status(201).json(attempt);
    }
    catch (error) {
        res.status(500).json({ message: 'Error submitting quiz', error });
    }
});
exports.submitQuiz = submitQuiz;
const getResultsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const results = yield quizService.getResultsByUserId(userId);
        res.status(200).json(results);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving results', error });
    }
});
exports.getResultsByUserId = getResultsByUserId;
