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
const option_repository_1 = require("../repositories/option.repository");
const course_repository_1 = require("../repositories/course.repository");
class QuizService {
    //   async createQuiz(quizData: Partial<Quiz>, questions: Partial<Question>[]): Promise<Quiz> {
    //   const quiz = QuizRepository.create(quizData);
    //   const savedQuiz = await QuizRepository.save(quiz);
    //   for (const questionData of questions) {
    //     const question = questionRepository.create({ ...questionData, quiz: savedQuiz });
    //     await questionRepository.save(question);
    //   }
    //   return savedQuiz;
    // }
    createQuiz(quizData, questions) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch course from DB to avoid NULL courseId
            // const course = await courseRepository.findOne({ where: { courseId: quizData.courseId } });
            // if (quizData.course) {
            //   const course = await courseRepository.findOne({ where: { courseId: quizData.course.courseId } });
            // } else {
            // Handle the case where quizData.course is undefined
            //   console.error("Course data is missing.");
            // }
            var _a;
            const course = yield course_repository_1.courseRepository.findOne({ where: { courseId: (_a = quizData.course) === null || _a === void 0 ? void 0 : _a.courseId } });
            if (!course) {
                throw new Error('Course not found');
            }
            const quiz = quiz_repository_1.QuizRepository.create({
                quizName: quizData.quizName,
                description: quizData.description,
                totalmarks: quizData.totalmarks,
                course: course // ✅ Set course relation properly
            });
            const savedQuiz = yield quiz_repository_1.QuizRepository.save(quiz);
            for (const q of questions) {
                const question = question_repository_1.questionRepository.create({
                    questionText: q.questionText,
                    correctOptionId: q.correctOptionId,
                    quiz: savedQuiz
                });
                const savedQuestion = yield question_repository_1.questionRepository.save(question);
                for (const opt of q.options) {
                    const option = option_repository_1.optionRepository.create({
                        optionText: opt.optionText,
                        question: savedQuestion
                    });
                    yield option_repository_1.optionRepository.save(option);
                }
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
