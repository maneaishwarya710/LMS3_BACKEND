import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Enrollment } from "./enrollment";
import { Payment } from "./payment";
import { Result } from "./result";
import { Course } from "./course";
import { Quiz } from "./quiz";
import { QuizAttempt } from "./quizAttempt";

@Entity("USER_LMS")
export class User {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    userType: string;

    @OneToMany(() => Enrollment, (enrollment) => enrollment.user, {cascade:true})
    enrollments: Enrollment[];

    @OneToMany(() => Payment, (payment) => payment.user, {cascade:true})
    payments: Payment[];

    @OneToMany(() => Result, (result) => result.user, {cascade:true})
    results: Result[];

    @OneToMany(()=>Course, (course)=>course.user, {cascade:true})
    course:Course[];

    // @OneToMany(()=>Quiz, (quiz)=>quiz.user)
    // quiz:Quiz[];

    @OneToMany(()=>QuizAttempt, (quizAttempts)=>quizAttempts.user, {cascade:true})
    quizAttempts:QuizAttempt[];
}