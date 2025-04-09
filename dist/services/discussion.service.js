"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussionService = void 0;
const discussion_repository_1 = require("../repositories/discussion.repository");
const discussionReply_repository_1 = require("../repositories/discussionReply.repository");
class DiscussionService {
    createPost(userId, title, content) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Service:userId-------------", userId);
            const post = discussion_repository_1.postRepository.create({
                user: { userId: userId }, title, content
            });
            console.log("In service of create post:", userId, title, content);
            return discussion_repository_1.postRepository.save(post);
        });
    }
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return discussion_repository_1.postRepository.find({
                relations: ['user', 'replies',
                    'replies.user']
            });
        });
    }
    addReply(postId, userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const reply = discussionReply_repository_1.replyRepository.create({
                content,
                post: { id: postId },
                user: { userId: userId }
            });
            return discussionReply_repository_1.replyRepository.save(reply);
        });
    }
    getPostById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return discussion_repository_1.postRepository.findOne({
                where: { id: postId },
                relations: ['user', 'replies', 'replies.user']
            });
        });
    }
}
exports.DiscussionService = DiscussionService;
