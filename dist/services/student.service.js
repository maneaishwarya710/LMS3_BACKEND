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
exports.StudentService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const result_repository_1 = require("../repositories/result.repository");
const enrollment_repository_1 = require("../repositories/enrollment.repository");
const payment_repository_1 = require("../repositories/payment.repository");
dotenv_1.default.config();
class StudentService {
    static enroll(enrollmentDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEnroll = enrollment_repository_1.EnrollmentRepository.create({
                enrollmentId: enrollmentDTO.enrollmentId,
                enrollmentDate: enrollmentDTO.enrollmentDate,
                completionStatus: enrollmentDTO.completionStatus,
                course: { courseId: enrollmentDTO.courseId },
                user: { userId: enrollmentDTO.userId }
            });
            const savedEnroll = yield enrollment_repository_1.EnrollmentRepository.save(newEnroll);
            return {
                enrollmentId: savedEnroll.enrollmentId,
                enrollmentDate: savedEnroll.enrollmentDate,
                completionStatus: savedEnroll.completionStatus,
                courseId: savedEnroll.course.courseId,
                userId: savedEnroll.user.userId
            };
        });
    }
    static getEnrolledCourses(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const enrollments = yield enrollment_repository_1.EnrollmentRepository.find({
                where: { user: { userId } },
                relations: ['course']
            });
            if (!enrollments || enrollments.length === 0) {
                throw new Error("No courses found for the enrolled student");
            }
            return enrollments.map(enrollment => ({
                courseId: enrollment.course.courseId,
                courseName: enrollment.course.courseName,
                description: enrollment.course.description,
                price: enrollment.course.price
            }));
        });
    }
    static getStudentResults(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield result_repository_1.ResultRepository.find({
                where: { user: { userId } },
                relations: ['course', 'quiz', 'user']
            });
            console.log("Results:", results);
            if (!results || results.length === 0) {
                throw new Error("No results found for the student");
            }
            return results.map(result => ({
                resultId: result.resultId,
                score: result.score,
                courseId: result.course.courseId,
                quizId: result.quiz.quizId,
                userId: result.user.userId
            }));
        });
    }
    static getPaymentsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payments = yield payment_repository_1.PaymentRepository.find({
                where: { user: { userId } },
                relations: ['user']
            });
            if (!payments || payments.length === 0) {
                throw new Error("No payments found for the user");
            }
            return payments;
        });
    }
}
exports.StudentService = StudentService;
