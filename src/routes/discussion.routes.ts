import express from 'express';
import { addReply, createPost, getAllPosts, getPost } from '../controllers/discussion.controller';
import { authenticateUser, roleBasedAccess } from '../middleware/auth.middleware';

const discRouter=express.Router();

discRouter.post('/createPost/:userId', authenticateUser, createPost);
discRouter.post('/addReply/:postId/:userId', authenticateUser, addReply);
discRouter.get('/getAllPosts', authenticateUser, getAllPosts);
discRouter.get('/getPostById/:id', authenticateUser, getPost);


export default discRouter;