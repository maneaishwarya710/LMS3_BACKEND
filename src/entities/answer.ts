import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinTable, JoinColumn } from "typeorm";
import { Enrollment } from "./enrollment";
import { CourseContent } from "./courseContent";
import { Quiz } from "./quiz";
import { Result } from "./result";
import { User } from "./user";
import { QuizAttempt } from "./quizAttempt";
import { Question } from "./question";

@Entity()
export class Answer {
@PrimaryGeneratedColumn()
answerId: number;
@Column()
attemptId: number;
@Column()
questionId: number;
@Column()
selectedOptionId: number;
@ManyToOne(() => QuizAttempt, (attempt) => attempt.answers)
@JoinColumn({ name: "attemptId" })
attempt: QuizAttempt;
@ManyToOne(() => Question, (question) => question.answers)
@JoinColumn({ name: "questionId" })
question: Question;
}