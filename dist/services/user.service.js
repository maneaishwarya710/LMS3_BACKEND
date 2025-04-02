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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
const dotenv_1 = __importDefault(require("dotenv"));
const secretKey = "JNC";
dotenv_1.default.config();
class UserService {
    static register(data) {
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
    static login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = data;
            const user = yield user_repository_1.UserRepository.findOne({ where: { username } });
            console.log(user);
            if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                throw new Error("Invalid email or password");
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.userId, username: user.username, password: user.password }, secretKey, {
                expiresIn: "1d"
            });
            console.log(user);
            return { token, user };
        });
    }
    static findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.UserRepository.findOne({ where: { userId } });
            if (!user) {
                throw new Error("No user found!");
            }
            return user;
        });
    }
    static getUserProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.UserRepository.findOne({
                where: { userId },
                relations: ["enrollments", "payments", "results"]
            });
            if (!user) {
                throw new Error("User not found");
            }
            const userProfile = {
                userId: user.userId,
                username: user.username,
                email: user.email,
                userType: user.userType
            };
            return userProfile;
        });
    }
}
exports.UserService = UserService;
