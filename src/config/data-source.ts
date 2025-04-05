import { DataSource } from "typeorm";
import 'reflect-metadata'
import dotenv from "dotenv";
import { User } from "../entities/user";
import { Course } from "../entities/course";
import { Quiz } from "../entities/quiz";
import { CourseContent } from "../entities/courseContent";
import { Enrollment } from "../entities/enrollment";
import { Payment } from "../entities/payment";
import { Result } from "../entities/result";
import { Answer } from "../entities/answer";
import { Question } from "../entities/question";
import { QuizAttempt } from "../entities/quizAttempt";
import { Option } from "../entities/option";

dotenv.config();

export const AppDataSource=new DataSource({
    type:"mssql",
    port:Number(process.env.DB_PORT),
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    entities:[User, Course, Quiz, CourseContent, Enrollment, Payment, Result, Answer, Option, Question, QuizAttempt],
    synchronize:false,
    logging:true,
    options:{
        trustServerCertificate:true
    }
});