import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn 
} from 'typeorm';
import { User } from './user';
import { DiscussionPost } from './discussion-post.entitty';
@Entity({name:"REPLY_LMS"})
export class DiscussionReply {
 @PrimaryGeneratedColumn()
 id: number;
 @Column('text')
 content: string;
 @CreateDateColumn()
 createdAt: Date;
 @ManyToOne(() => User, user => user.replies)
 @JoinColumn({name:'userId'})
 user: User;
 @ManyToOne(() => DiscussionPost, post => post.replies)
 post: DiscussionPost;
}