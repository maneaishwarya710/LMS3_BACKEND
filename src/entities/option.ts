import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Question } from "./question";

@Entity({name:"OPTION_LMS"})
export class Option {
@PrimaryGeneratedColumn()
optionId: number;
@Column()
questionId: number;
@Column()
optionText: string;
@ManyToOne(() => Question, (question) => question.options)
@JoinColumn({ name: "questionId" })
question: Question;
}
