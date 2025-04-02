import { AppDataSource } from "../config/data-source";
import { Enrollment } from "../entities/enrollment";


export const EnrollmentRepository=AppDataSource.getRepository(Enrollment);