import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn} from 'typeorm';
import { DiscussionReply } from './discussion-rename.entity';
import { User } from './user';
    @Entity({name:"POST_LMS"})
    export class DiscussionPost {
     @PrimaryGeneratedColumn()
     id: number;
     @Column()
     title: string;
     @Column('text')
     content: string;
     @CreateDateColumn()
     createdAt: Date;
     @ManyToOne(() => User, user => user.posts)
     @JoinColumn({name:'userId'})
     user: User;
     @OneToMany(() => DiscussionReply, reply => reply.post, { cascade: true })
     replies: DiscussionReply[];
    }
    