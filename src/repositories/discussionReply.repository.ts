import { AppDataSource } from "../config/data-source";
import { DiscussionReply } from "../entities/discussion-rename.entity";

export const replyRepository=AppDataSource.getRepository(DiscussionReply);