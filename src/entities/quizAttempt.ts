import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Course } from "./course";
import { MAX } from "class-validator";
import { Quiz } from "./quiz";
import { Option } from "./option";
import { User } from "./user";
import { Answer } from "./answer";

@Entity({name:"QUIZATTEMPT_LMS"})
export class QuizAttempt {
@PrimaryGeneratedColumn()
attemptId: number;
@Column()
userId: number;
@Column()
quizId: number;

@Column({ type: 'float', default: 0 })
score: number;
@Column()
attemptDate: Date;
@ManyToOne(() => User, (user) => user.quizAttempts)
@JoinColumn({ name: "userId" })

user: User;
@ManyToOne(() => Quiz, (quiz) => quiz.attempts)
@JoinColumn({ name: "quizId" })
quiz: Quiz;

@OneToMany(()=>Answer, (answers)=>answers.attempt)
answers:Answer[];
}
