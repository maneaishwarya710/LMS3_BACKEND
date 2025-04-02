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

dotenv.config();

export class AdminService {
    static async viewAllUsers(): Promise<UserDTO[]> {
        const users: User[] = await UserRepository.createQueryBuilder("user").getMany();
        const userDTOs: UserDTO[] = users.map(user => ({
            username: user.username,
            email: user.email,
            password: user.password,
            userType: user.userType
        }));
        return userDTOs;
    }

    static async deleteUserById(userId: number) {
        await UserRepository
            .createQueryBuilder().delete().from(User).where("userId = :userId", { userId: userId }).execute();
    }

    static async addUser(data: UserDTO) {
        const { username, email, password, userType } = data;
        const existingUser = await UserRepository.findOne({
            where: { email }
        });
        if (existingUser) throw new Error("User already exists");
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = UserRepository.create({
            username, email, password:
                hashedPassword, userType
        });
        return await UserRepository.save(newUser);
    }

    static async paymentList(): Promise<PaymentDTO[]> {
        const paymentList: Payment[] = await PaymentRepository.createQueryBuilder("payment")
            .leftJoinAndSelect("payment.user", "user")
            .getMany();
        
        const paymentDTOs: PaymentDTO[] = paymentList.map(payment => ({
            paymentId: payment.paymentId,
            amount: payment.amount,
            paymentDate: payment.paymentDate,
            paymentMethod: payment.paymentMethod,
            userId: payment.user.userId
        }));
        
        return paymentDTOs;
    }

    static async enrollmentList(): Promise<EnrollmentDTO[]> {
        const enrollList: Enrollment[] = await EnrollmentRepository.createQueryBuilder("enrollment")
            .leftJoinAndSelect("enrollment.user", "user")
            .leftJoinAndSelect("enrollment.course", "course")
            .getMany();
        
        const enrollmentDTOs: EnrollmentDTO[] = enrollList.map(enrollment => ({
            enrollmentId: enrollment.enrollmentId,
            enrollmentDate: enrollment.enrollmentDate,
            completionStatus: enrollment.completionStatus,
            courseId: enrollment.course.courseId,
            userId: enrollment.user.userId
        }));
        
        return enrollmentDTOs;
    }
}
