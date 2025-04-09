import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Course } from "./course";
import { Result } from "./result";
import { User } from "./user";
import { Question } from "./question";
import { QuizAttempt } from "./quizAttempt";

@Entity("Quiz_LMS")
export class Quiz {

    @PrimaryGeneratedColumn()
    quizId: number;

    @Column()
    quizName: string;

    @Column({ length: 500, default:"default_description"})
    description: string;

    @Column("int")
    totalmarks: number;

    @ManyToOne(() => Course, (course) => course.quizzes, {onDelete: "CASCADE" })
    @JoinColumn({ name: "courseId" })
    course: Course;

    // @ManyToOne(()=>User, (user)=>user.quiz)
    // @JoinColumn({ name: "creatorId" })
    // user:User;

    @OneToMany(() => Result, (result) => result.quiz, {cascade:true})
    results: Result[];

    @OneToMany(()=>Question, (questions)=>questions.quiz, {cascade:true, eager:true})
    questions:Question[];

    @OneToMany(()=>QuizAttempt, (attempts)=>attempts.quiz)
    attempts:QuizAttempt[];

    
}