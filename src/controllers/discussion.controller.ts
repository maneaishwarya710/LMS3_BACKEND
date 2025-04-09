import { Request, Response } from 'express';
import { DiscussionService } from '../services/discussion.service';

const discussionService = new DiscussionService();

export const createPost = async (req: Request, res: Response) => {
  try {
    const userId=Number(req.params.userId);
    const { title, content } = req.body;

    // Validate input
    if (!userId || !title || !content) {
      res.status(400).json({ message: 'Invalid input: userId, title, and content are required' });
    }
    console.log("In controllerb of craete post:", userId, title, content);
    const post = await discussionService.createPost(userId, title, content);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post', error });

    // if (!res.headersSent) {
    //   return res.status(500).json({ message: 'Internal Server Error' });
    // }

  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await discussionService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ message: 'Error retrieving posts', error });
  }
};

export const addReply = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);
    const userId=Number(req.params.userId)
    const {content} = req.body;

    // Validate input
    if (isNaN(postId) || !userId || !content) {
      res.status(400).json({ message: 'Invalid input: postId, userId, and content are required' });
    }

    const reply = await discussionService.addReply(postId, userId, content);
    res.status(201).json(reply);
  } catch (error) {
    console.error(`Error adding reply to postId ${req.params.postId}:`, error);
    res.status(500).json({ message: 'Error adding reply', error });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.id);

    // Validate input
    if (isNaN(postId)) {
      res.status(400).json({ message: 'Invalid postId parameter' });
    }

    const post = await discussionService.getPostById(postId);
    res.status(200).json(post);
  } catch (error) {
    console.error(`Error retrieving post with postId ${req.params.postId}:`, error);
    res.status(500).json({ message: 'Error retrieving post', error });
  }
};