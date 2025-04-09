import { DiscussionPost } from '../entities/discussion-post.entitty';
import { DiscussionReply } from '../entities/discussion-rename.entity';
import { postRepository } from '../repositories/discussion.repository';
import { replyRepository } from '../repositories/discussionReply.repository';

export class DiscussionService {
    async createPost(userId: number, title: string, content: string) {
        console.log("Service:userId-------------",userId);
        
        const post = postRepository.create({
            user: { userId: userId }, title, content
        });
        console.log("In service of create post:", userId, title, content);
        return postRepository.save(post);
    }
    async getAllPosts() {
        return postRepository.find({
            relations: ['user', 'replies',
                'replies.user']
                
        });
    }
    async addReply(postId: number, userId: number, content: string) {
        const reply = replyRepository.create({
            content,
            post: { id: postId },
            user: { userId: userId }
        });
        return replyRepository.save(reply);
    }
    async getPostById(postId: number) {
        return postRepository.findOne({
            where: { id: postId },
            relations: ['user', 'replies', 'replies.user']
        });
    }
}
