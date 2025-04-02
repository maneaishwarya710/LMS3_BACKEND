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
exports.AdminService = void 0;
const user_1 = require("../entities/user");
const user_repository_1 = require("../repositories/user.repository");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const payment_repository_1 = require("../repositories/payment.repository");
const enrollment_repository_1 = require("../repositories/enrollment.repository");
dotenv_1.default.config();
class AdminService {
    static viewAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_repository_1.UserRepository.createQueryBuilder("user").getMany();
            const userDTOs = users.map(user => ({
                username: user.username,
                email: user.email,
                password: user.password,
                userType: user.userType
            }));
            return userDTOs;
        });
    }
    static deleteUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_repository_1.UserRepository
                .createQueryBuilder().delete().from(user_1.User).where("userId = :userId", { userId: userId }).execute();
        });
    }
    static addUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, userType } = data;
            const existingUser = yield user_repository_1.UserRepository.findOne({
                where: { email }
            });
            if (existingUser)
                throw new Error("User already exists");
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = user_repository_1.UserRepository.create({
                username, email, password: hashedPassword, userType
            });
            return yield user_repository_1.UserRepository.save(newUser);
        });
    }
    static paymentList() {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentList = yield payment_repository_1.PaymentRepository.createQueryBuilder("payment")
                .leftJoinAndSelect("payment.user", "user")
                .getMany();
            const paymentDTOs = paymentList.map(payment => ({
                paymentId: payment.paymentId,
                amount: payment.amount,
                paymentDate: payment.paymentDate,
                paymentMethod: payment.paymentMethod,
                userId: payment.user.userId
            }));
            return paymentDTOs;
        });
    }
    static enrollmentList() {
        return __awaiter(this, void 0, void 0, function* () {
            const enrollList = yield enrollment_repository_1.EnrollmentRepository.createQueryBuilder("enrollment")
                .leftJoinAndSelect("enrollment.user", "user")
                .leftJoinAndSelect("enrollment.course", "course")
                .getMany();
            const enrollmentDTOs = enrollList.map(enrollment => ({
                enrollmentId: enrollment.enrollmentId,
                enrollmentDate: enrollment.enrollmentDate,
                completionStatus: enrollment.completionStatus,
                courseId: enrollment.course.courseId,
                userId: enrollment.user.userId
            }));
            return enrollmentDTOs;
        });
    }
}
exports.AdminService = AdminService;
