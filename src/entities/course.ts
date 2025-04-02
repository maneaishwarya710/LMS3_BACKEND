import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Enrollment } from "./enrollment";
import { CourseContent } from "./courseContent";
import { Quiz } from "./quiz";
import { Result } from "./result";

@Entity("COURSE_LMS")
export class Course {

    @PrimaryGeneratedColumn()
    courseId: number;

    @Column({ length: 100, default:"default_COURSENAME"})
    courseName: string;

    @Column({ length: 500, default:"default_description" })
    description: string;

    @Column()
    price: number;

    @OneToMany(() => Enrollment, (enrollment) => enrollment.course, {cascade:true})
    enrollments: Enrollment[];

    @OneToMany(() => CourseContent, (courseContent) => courseContent.course, {cascade:true})
    contents: CourseContent[];

    @OneToMany(() => Quiz, (quiz) => quiz.course, {cascade:true})
    quizzes: Quiz[];

    @OneToMany(() => Result, (result) => result.course, {cascade:true})
    results: Result[];
}