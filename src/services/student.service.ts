import dotenv from "dotenv";
import { CourseDTO } from "../dto/course.dto";
import { Course } from "../entities/course";
import { courseRepository } from "../repositories/course.repository";
import { CourseContentDTO } from "../dto/courseContent.dto";
import { courseContentRepository } from "../repositories/courseContent.repoisitory";
import { QuizRepository } from "../repositories/quiz.repository";
import { QuizDTO } from "../dto/quiz.dto";
import { ResultDTO } from "../dto/result.dto";
import { ResultRepository } from "../repositories/result.repository";
import { EnrollmentDTO } from "../dto/enrollment.dto";
import { EnrollmentRepository } from "../repositories/enrollment.repository";
import { UserRepository } from "../repositories/user.repository";
import { Payment } from "../entities/payment";
import { PaymentRepository } from "../repositories/payment.repository";
dotenv.config();

export class StudentService {
    static async enroll(enrollmentDTO: EnrollmentDTO): Promise<EnrollmentDTO> {
        const newEnroll = EnrollmentRepository.create({
            enrollmentId: enrollmentDTO.enrollmentId,
            enrollmentDate: enrollmentDTO.enrollmentDate,
            completionStatus: enrollmentDTO.completionStatus,
            course: { courseId: enrollmentDTO.courseId }, 
            user: { userId: enrollmentDTO.userId }
        });

        const savedEnroll = await EnrollmentRepository.save(newEnroll);

        return {
            enrollmentId: savedEnroll.enrollmentId,
            enrollmentDate: savedEnroll.enrollmentDate,
            completionStatus: savedEnroll.completionStatus,
            courseId: savedEnroll.course.courseId,
            userId: savedEnroll.user.userId
        };
    }

    static async getEnrolledCourses(userId: number): Promise<CourseDTO[]> {
        const enrollments = await EnrollmentRepository.find({
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
    }

    static async getStudentResults(userId: number): Promise<ResultDTO[]> {
        const results = await ResultRepository.find({
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
    }

    static async getPaymentsByUserId(userId: number): Promise<Payment[]> {
        const payments = await PaymentRepository.find({
            where: { user: { userId } },
            relations: ['user']
        });

        if (!payments || payments.length === 0) {
            throw new Error("No payments found for the user");
        }

        return payments;
    }
}
