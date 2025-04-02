import { AppDataSource } from "../config/data-source";
import { CourseContent } from "../entities/courseContent";

export const courseContentRepository=AppDataSource.getRepository(CourseContent);