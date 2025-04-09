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
exports.getPost = exports.addReply = exports.getAllPosts = exports.createPost = void 0;
const discussion_service_1 = require("../services/discussion.service");
const discussionService = new discussion_service_1.DiscussionService();
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const { title, content } = req.body;
        // Validate input
        if (!userId || !title || !content) {
            res.status(400).json({ message: 'Invalid input: userId, title, and content are required' });
        }
        console.log("In controllerb of craete post:", userId, title, content);
        const post = yield discussionService.createPost(userId, title, content);
        res.status(201).json(post);
    }
    catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post', error });
        // if (!res.headersSent) {
        //   return res.status(500).json({ message: 'Internal Server Error' });
        // }
    }
});
exports.createPost = createPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield discussionService.getAllPosts();
        res.status(200).json(posts);
    }
    catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ message: 'Error retrieving posts', error });
    }
});
exports.getAllPosts = getAllPosts;
const addReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = Number(req.params.postId);
        const userId = Number(req.params.userId);
        const { content } = req.body;
        // Validate input
        if (isNaN(postId) || !userId || !content) {
            res.status(400).json({ message: 'Invalid input: postId, userId, and content are required' });
        }
        const reply = yield discussionService.addReply(postId, userId, content);
        res.status(201).json(reply);
    }
    catch (error) {
        console.error(`Error adding reply to postId ${req.params.postId}:`, error);
        res.status(500).json({ message: 'Error adding reply', error });
    }
});
exports.addReply = addReply;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = Number(req.params.id);
        // Validate input
        if (isNaN(postId)) {
            res.status(400).json({ message: 'Invalid postId parameter' });
        }
        const post = yield discussionService.getPostById(postId);
        res.status(200).json(post);
    }
    catch (error) {
        console.error(`Error retrieving post with postId ${req.params.postId}:`, error);
        res.status(500).json({ message: 'Error retrieving post', error });
    }
});
exports.getPost = getPost;
