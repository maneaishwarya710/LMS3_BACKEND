import { AppDataSource } from "../config/data-source";
import { Course } from "../entities/course";

export const courseRepository=AppDataSource.getRepository(Course);