import { AppDataSource } from "../config/data-source";
import { Result } from "../entities/result";

export const ResultRepository=AppDataSource.getRepository(Result);