import { User } from "../entities/user";
import { UserRepository } from "../repositories/user.repository";
import { UserDTO } from "../dto/user.dto";
import dotenv from "dotenv";
import bcrypt from "bcrypt"
import { EnrollmentDTO } from "../dto/enrollment.dto";
import { Payment } from "../entities/payment";
import { PaymentRepository } from "../repositories/payment.repository";
import { PaymentDTO } from "../dto/payment.dto";
import { EnrollmentRepository } from "../repositories/enrollment.repository";
import { Enrollment } from "../entities/enrollment";
import { Course } from "../entities/course";
import { courseRepository } from "../repositories/course.repository";

dotenv.config();

export class CourseService {
    async getAllCourses(): Promise<Course[]> {
        return await courseRepository.find({ relations: ['user', 'enrollments', 'contents', 'quizzes', 'results'] });
      }
    
}
