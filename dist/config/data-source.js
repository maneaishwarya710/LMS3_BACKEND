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
const answer_1 = require("../entities/answer");
const question_1 = require("../entities/question");
const quizAttempt_1 = require("../entities/quizAttempt");
const option_1 = require("../entities/option");
const discussion_post_entitty_1 = require("../entities/discussion-post.entitty");
const discussion_rename_entity_1 = require("../entities/discussion-rename.entity");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    entities: [user_1.User, course_1.Course, quiz_1.Quiz, courseContent_1.CourseContent, enrollment_1.Enrollment, payment_1.Payment, result_1.Result, answer_1.Answer, option_1.Option, question_1.Question, quizAttempt_1.QuizAttempt, discussion_post_entitty_1.DiscussionPost, discussion_rename_entity_1.DiscussionReply],
    synchronize: false,
    logging: false,
    options: {
        trustServerCertificate: true
    }
});
