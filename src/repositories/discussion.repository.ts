import { AppDataSource } from "../config/data-source";
import { DiscussionPost } from "../entities/discussion-post.entitty";

export const postRepository=AppDataSource.getRepository(DiscussionPost);