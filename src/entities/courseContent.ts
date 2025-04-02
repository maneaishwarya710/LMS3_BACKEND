import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Course } from "./course";
import { MAX } from "class-validator";

@Entity("COURSECONTENT_LMS")
export class CourseContent {

    @PrimaryGeneratedColumn()
    contentId: number;

    @Column({ default: "tutorials", length: 50})
    contentType: string;

    @Column({ type: "varchar", length: MAX, default:"default_content" })
    content: string;

    @ManyToOne(() => Course, (course) => course.contents, {onDelete: "CASCADE" })
    @JoinColumn({ name: "courseId" })
    course: Course;
}