import { AppDataSource } from "../config/data-source";
import { Question } from "../entities/question";


export const questionRepository=AppDataSource.getRepository(Question);