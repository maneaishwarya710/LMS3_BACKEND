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
const option_repository_1 = require("../repositories/option.repository");
const course_repository_1 = require("../repositories/course.repository");
class QuizService {
    createQuiz(quizData, questions) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Fetch the course entity
            const course = yield course_repository_1.courseRepository.findOne({ where: { courseId: (_a = quizData.course) === null || _a === void 0 ? void 0 : _a.courseId } });
            if (!course) {
                throw new Error('Course not found');
            }
            // Create and save the quiz
            const quiz = quiz_repository_1.QuizRepository.create({
                quizName: quizData.quizName,
                description: quizData.description,
                totalmarks: quizData.totalmarks,
                course: course, // Set the course relation
            });
            const savedQuiz = yield quiz_repository_1.QuizRepository.save(quiz);
            // Save questions and options
            for (const q of questions) {
                const question = question_repository_1.questionRepository.create({
                    questionText: q.questionText,
                    quiz: savedQuiz, // Set the quiz relation
                });
                const savedQuestion = yield question_repository_1.questionRepository.save(question);
                const savedOptions = [];
                for (const opt of q.options) {
                    const option = option_repository_1.optionRepository.create({
                        optionText: opt.optionText,
                        isCorrect: opt.isCorrect, // Set the correct flag
                        question: savedQuestion, // Set the question relation
                    });
                    const savedOption = yield option_repository_1.optionRepository.save(option);
                    savedOptions.push(savedOption);
                }
                // Update correctOptionId after saving options
                const correctOption = savedOptions.find(o => o.isCorrect);
                if (correctOption) {
                    savedQuestion.correctOptionId = correctOption.optionId;
                    yield question_repository_1.questionRepository.save(savedQuestion);
                }
            }
            return savedQuiz;
        });
    }
    // async createQuiz(quizData: Partial<Quiz>, questions: any[]): Promise<Quiz> {
    //   const quiz = QuizRepository.create(quizData);
    //   const savedQuiz = await QuizRepository.save(quiz);
    //   for (const q of questions) {
    //     const question = questionRepository.create({
    //       quizId: savedQuiz.quizId,
    //       questionText: q.questionText,
    //       correctOptionId: 0, // temp
    //     });
    //     const savedQuestion = await questionRepository.save(question);
    //     const savedOptions = [];
    //     for (const opt of q.options) {
    //       const option = optionRepository.create({
    //         questionId: savedQuestion.questionId,
    //         optionText: opt.optionText,
    //       });
    //       const savedOption = await optionRepository.save(option);
    //       savedOptions.push(savedOption);
    //     }
    //     // Update correctOptionId after options are saved
    //     const correctOption = savedOptions.find(o => o.optionText === q.correctAnswer);
    //     if (correctOption) {
    //       savedQuestion.correctOptionId = correctOption.optionId;
    //       await questionRepository.save(savedQuestion);
    //     }
    //   }
    //   return savedQuiz;
    // }
    getQuizByCourseId(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield quiz_repository_1.QuizRepository.find({
                where: { course: { courseId } },
                relations: ['questions', 'questions.options'], // Load questions and their options
            });
        });
    }
    // async getQuizByCourseId(courseId: number): Promise<Quiz[]> {
    //   return QuizRepository.find({
    //     where: { course: { courseId: courseId } },
    //     relations: {
    //       questions: {
    //         options: true
    //       }
    //     }
    //   });
    // }
    submitQuiz(attemptData, answers) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, quizId } = attemptData;
            let score = 0;
            for (const answer of answers) {
                // Fetch the correct option for this question
                const correctOption = yield option_repository_1.optionRepository.findOne({
                    where: {
                        question: { questionId: answer.questionId },
                        isCorrect: true,
                    },
                    relations: ['question'], // Ensure relation is loaded
                });
                // Compare selectedOptionId with the correct one
                if (correctOption &&
                    correctOption.optionId === answer.selectedOptionId) {
                    score++;
                }
            }
            // Create and save the attempt
            const attempt = quizAttempt_repository_1.QuizAttemptRepository.create({
                userId,
                quizId,
                score,
                attemptDate: new Date(), // Add date explicitly
            });
            yield quizAttempt_repository_1.QuizAttemptRepository.save(attempt);
            return { score };
        });
    }
    getResultsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield result_repository_1.ResultRepository.find({ where: { user: { userId } }, relations: ['quiz', 'course'] });
        });
    }
}
exports.QuizService = QuizService;
// async submitQuiz(attemptData: Partial<QuizAttempt>, answers: Partial<Answer>[]): Promise<QuizAttempt> {
//   attemptData.score = 0;
//   attemptData.attemptDate=new Date();
//   const attempt = QuizAttemptRepository.create(attemptData);
//   const savedAttempt = await QuizAttemptRepository.save(attempt);
//   let score = 0;
//   for (const answerData of answers) {
//     const answer = answerRepository.create({ ...answerData, attempt: savedAttempt });
//     await answerRepository.save(answer);
//     // Check if the answer is correct
//     const question = await questionRepository.findOne({ where: { questionId: answer.questionId } });
//   //   const question = await questionRepository.findOne(answer.questionId);
//   //   const question = await questionRepository.find({where:{answers.questionId}});
//     if (question && question.correctOptionId === answer.selectedOptionId) {
//       score += 1; // Increment score for each correct answer
//     }
//   }
//   // Save the result
//   const result = ResultRepository.create({
//       score,
//       //course: { courseId: attemptData.courseId },
//       quiz: { quizId: attemptData.quizId },
//       user: { userId: attemptData.userId },
//       attemptDate: new Date()
//   });
//   await ResultRepository.save(result);
//   // Update the attempt with the score
//   savedAttempt.score = score;
//   await QuizAttemptRepository.save(savedAttempt);
//   return savedAttempt;
// }
