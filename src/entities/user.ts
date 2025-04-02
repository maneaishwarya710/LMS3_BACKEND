import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Enrollment } from "./enrollment";
import { Payment } from "./payment";
import { Result } from "./result";

@Entity("USER_LMS")
export class User {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    userType: string;

    @OneToMany(() => Enrollment, (enrollment) => enrollment.user, {cascade:true})
    enrollments: Enrollment[];

    @OneToMany(() => Payment, (payment) => payment.user, {cascade:true})
    payments: Payment[];

    @OneToMany(() => Result, (result) => result.user, {cascade:true})
    results: Result[];
}