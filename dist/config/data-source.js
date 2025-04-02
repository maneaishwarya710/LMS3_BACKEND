"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../entities/user");
const course_1 = require("../entities/course");
const quiz_1 = require("../entities/quiz");
const courseContent_1 = require("../entities/courseContent");
const enrollment_1 = require("../entities/enrollment");
const payment_1 = require("../entities/payment");
const result_1 = require("../entities/result");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    entities: [user_1.User, course_1.Course, quiz_1.Quiz, courseContent_1.CourseContent, enrollment_1.Enrollment, payment_1.Payment, result_1.Result],
    synchronize: false,
    logging: true,
    options: {
        trustServerCertificate: true
    }
});
