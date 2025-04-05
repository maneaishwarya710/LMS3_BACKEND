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
exports.QuizService = void 0;
const question_repository_1 = require("../repositories/question.repository");
const quiz_repository_1 = require("../repositories/quiz.repository");
const result_repository_1 = require("../repositories/result.repository");
const quizAttempt_repository_1 = require("../repositories/quizAttempt.repository");
const answer_repository_1 = require("../repositories/answer.repository");
class QuizService {
    createQuiz(quizData, questions) {
        return __awaiter(this, void 0, void 0, function* () {
            const quiz = quiz_repository_1.QuizRepository.create(quizData);
            const savedQuiz = yield quiz_repository_1.QuizRepository.save(quiz);
            for (const questionData of questions) {
                const question = question_repository_1.questionRepository.create(Object.assign(Object.assign({}, questionData), { quiz: savedQuiz }));
                yield question_repository_1.questionRepository.save(question);
            }
            return savedQuiz;
        });
    }
    getQuizByCourseId(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield quiz_repository_1.QuizRepository.find({ where: { course: { courseId } }, relations: ['questions', 'questions.options'] });
        });
    }
    submitQuiz(attemptData, answers) {
        return __awaiter(this, void 0, void 0, function* () {
            attemptData.score = 0;
            const attempt = quizAttempt_repository_1.QuizAttemptRepository.create(attemptData);
            const savedAttempt = yield quizAttempt_repository_1.QuizAttemptRepository.save(attempt);
            let score = 0;
            for (const answerData of answers) {
                const answer = answer_repository_1.answerRepository.create(Object.assign(Object.assign({}, answerData), { attempt: savedAttempt }));
                yield answer_repository_1.answerRepository.save(answer);
                // Check if the answer is correct
                const question = yield question_repository_1.questionRepository.findOne({ where: { questionId: answer.questionId } });
                //   const question = await questionRepository.findOne(answer.questionId);
                //   const question = await questionRepository.find({where:{answers.questionId}});
                if (question && question.correctOptionId === answer.selectedOptionId) {
                    score += 1; // Increment score for each correct answer
                }
            }
            // Save the result
            const result = result_repository_1.ResultRepository.create({
                score,
                //course: { courseId: attemptData.courseId },
                quiz: { quizId: attemptData.quizId },
                user: { userId: attemptData.userId },
                attemptDate: new Date()
            });
            yield result_repository_1.ResultRepository.save(result);
            // Update the attempt with the score
            savedAttempt.score = score;
            yield quizAttempt_repository_1.QuizAttemptRepository.save(savedAttempt);
            return savedAttempt;
        });
    }
    getResultsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield result_repository_1.ResultRepository.find({ where: { user: { userId } }, relations: ['quiz', 'course'] });
        });
    }
}
exports.QuizService = QuizService;
