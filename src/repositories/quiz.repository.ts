import { AppDataSource } from "../config/data-source";
import { Quiz } from "../entities/quiz";

export const QuizRepository=AppDataSource.getRepository(Quiz);