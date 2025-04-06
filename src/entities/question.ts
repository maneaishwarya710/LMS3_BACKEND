import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Course } from "./course";
import { MAX } from "class-validator";
import { Quiz } from "./quiz";
import { Option } from "./option";
import { Answer } from "./answer";

@Entity({name:"QUESTION_LMS"})
export class Question {
@PrimaryGeneratedColumn()
questionId: number;

@Column()
quizId: number;
@Column()
questionText: string;

@Column()
correctOptionId: number;

@ManyToOne(() => Quiz, (quiz) => quiz.questions)
@JoinColumn({ name: "quizId" })
quiz: Quiz;

@OneToMany(()=>Option, (option)=>option.question, {cascade:true, eager:true})
options:Option[];

@OneToMany(()=>Answer, (answers)=>answers.question)
answers:Answer[];
}