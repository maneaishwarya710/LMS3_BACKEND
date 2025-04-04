import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinTable } from "typeorm";
import { Enrollment } from "./enrollment";
import { CourseContent } from "./courseContent";
import { Quiz } from "./quiz";
import { Result } from "./result";
import { User } from "./user";

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

    @Column({default:'assets/noFound.jpg'})
    imgurl:string;

    @OneToMany(() => Enrollment, (enrollment) => enrollment.course, {cascade:true})
    enrollments: Enrollment[];

    @OneToMany(() => CourseContent, (courseContent) => courseContent.course, {cascade:true})
    contents: CourseContent[];

    @OneToMany(() => Quiz, (quiz) => quiz.course, {cascade:true})
    quizzes: Quiz[];

    @OneToMany(() => Result, (result) => result.course, {cascade:true})
    results: Result[];

    @ManyToOne(()=>User, (user)=>user.course, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinTable({name:"creatorId"})
    user:User;
}