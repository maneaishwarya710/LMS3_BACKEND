import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Course } from "./course";
import { Quiz } from "./quiz";
import { User } from "./user";

@Entity("RESULT_LMS")
export class Result {

    @PrimaryGeneratedColumn()
    resultId: number;

    @Column("int")
    score: number;

    @ManyToOne(() => Course, (course) => course.results)
    @JoinColumn({ name: "courseId" })
    course: Course;

    @ManyToOne(() => Quiz, (quiz) => quiz.results, { onDelete: "CASCADE" })
    @JoinColumn({ name: "quizId" })
    quiz: Quiz;

    @ManyToOne(() => User, (user) => user.results, {onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user: User;

    @CreateDateColumn({type:'datetime', default:()=>'GETDATE()'})
    attemptDate:Date;
}