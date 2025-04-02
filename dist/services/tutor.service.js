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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const course_1 = require("../entities/course");
const course_repository_1 = require("../repositories/course.repository");
const courseContent_repoisitory_1 = require("../repositories/courseContent.repoisitory");
const quiz_repository_1 = require("../repositories/quiz.repository");
const result_repository_1 = require("../repositories/result.repository");
dotenv_1.default.config();
class TutorService {
    static createNewCourse(courseDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCourse = course_repository_1.courseRepository.create({
                courseName: courseDTO.courseName,
                description: courseDTO.description,
                price: courseDTO.price
            });
            const savedCourse = yield course_repository_1.courseRepository.save(newCourse);
            return {
                courseId: savedCourse.courseId,
                courseName: savedCourse.courseName,
                description: savedCourse.description,
                price: savedCourse.price
            };
        });
    }
    static createNewCourseContent(courseContentDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCourseContent = courseContent_repoisitory_1.courseContentRepository.create({
                contentType: courseContentDTO.contentType,
                content: courseContentDTO.content,
                course: { courseId: courseContentDTO.courseId } // Assuming courseId is provided
            });
            const savedCourseContent = yield courseContent_repoisitory_1.courseContentRepository.save(newCourseContent);
            return {
                contentId: savedCourseContent.contentId,
                contentType: savedCourseContent.contentType,
                content: savedCourseContent.content,
                courseId: savedCourseContent.course.courseId
            };
        });
    }
    static removeCourseById(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield course_repository_1.courseRepository
                .createQueryBuilder().delete().from(course_1.Course).where("courseId = :courseId", { courseId: courseId }).execute();
        });
    }
    static createNewQuiz(quizDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newQuiz = quiz_repository_1.QuizRepository.create({
                quizName: quizDTO.quizName,
                description: quizDTO.description,
                totalmarks: quizDTO.totalmarks,
                course: { courseId: quizDTO.courseId } // Assuming courseId is provided
            });
            const savedQuiz = yield quiz_repository_1.QuizRepository.save(newQuiz);
            return {
                quizId: savedQuiz.quizId,
                quizName: savedQuiz.quizName,
                description: savedQuiz.description,
                totalmarks: savedQuiz.totalmarks,
                courseId: savedQuiz.course.courseId
            };
        });
    }
    static createResult(resultDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newResult = result_repository_1.ResultRepository.create({
                score: resultDTO.score,
                course: { courseId: resultDTO.courseId },
                quiz: { quizId: resultDTO.quizId },
                user: { userId: resultDTO.userId }
            });
            const savedResult = yield result_repository_1.ResultRepository.save(newResult);
            return {
                resultId: savedResult.resultId,
                score: savedResult.score,
                courseId: savedResult.course.courseId,
                quizId: savedResult.quiz.quizId,
                userId: savedResult.user.userId
            };
        });
    }
}
exports.TutorService = TutorService;
