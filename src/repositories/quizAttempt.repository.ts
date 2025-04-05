import { AppDataSource } from "../config/data-source";
import { QuizAttempt } from "../entities/quizAttempt";
export const QuizAttemptRepository=AppDataSource.getRepository(QuizAttempt);