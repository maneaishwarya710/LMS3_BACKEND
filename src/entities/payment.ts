import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user";

@Entity("PAYMENT_LMS")
export class Payment {

    @PrimaryGeneratedColumn()
    paymentId: number;

    @Column("decimal", { precision: 10, scale: 2 })
    amount: number;

    @Column()
    paymentDate: Date;

    @Column()
    paymentMethod: string;

    @ManyToOne(() => User, (user) => user.payments, {onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user: User;
}