import { AppDataSource } from "../config/data-source";
import { Answer } from "../entities/answer";
export const answerRepository=AppDataSource.getRepository(Answer);