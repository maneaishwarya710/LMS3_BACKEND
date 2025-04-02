import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Course } from "./course";
import { Result } from "./result";

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

    @OneToMany(() => Result, (result) => result.quiz, {cascade:true})
    results: Result[];
}