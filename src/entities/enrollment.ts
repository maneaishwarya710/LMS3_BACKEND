import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Course } from "./course";
import { User } from "./user";

@Entity("ENROLLMENT_LMS")
export class Enrollment {

    @PrimaryGeneratedColumn()
    enrollmentId: number;

    @Column()
    enrollmentDate: Date;

    @Column()
    completionStatus: string;

    @ManyToOne(() => Course, (course) => course.enrollments, {onDelete: "CASCADE" })
    @JoinColumn({ name: "courseId" })
    course: Course;

    @ManyToOne(() => User, (user) => user.enrollments, {onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user: User;
}