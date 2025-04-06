import { Request, Response } from "express";
import { StudentService } from "../services/student.service";
import { UserDTO } from "../dto/user.dto";
import { validate } from "class-validator";
import { EnrollmentDTO } from "../dto/enrollment.dto";
import { ResultRepository } from "../repositories/result.repository";
import { ResultDTO } from "../dto/result.dto";
import { log } from "console";
export class StudentController {
    static async enroll(req: Request, res: Response) {
        try {
            const enrollmentDTO: EnrollmentDTO = req.body; 
            const savedEnrollment = await StudentService.enroll(enrollmentDTO);
            res.status(200).json({ message: "Enrollment successful", savedEnrollment });
        } catch (error) {
            console.error("Error enrolling:", error);
            res.status(400).json({ error: "Unable to enroll!"});
        }
    }

    static async getEnrolledCourses(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            console.log("User ID:", userId); // Log the userId to verify
            const enrolledCourses = await StudentService.getEnrolledCourses(+userId);
            res.status(200).json({ enrolledCourses });
        } catch (error) {
            console.error("Error fetching enrolled courses:", error);
            res.status(400).json({ error: "Unable to fetch enrolled courses!" });
        }
    }
    

    static async getStudentResult(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id); // Assuming user ID is available in the request object
            const studentResults = await StudentService.getStudentResults(userId);
            res.status(200).json({ studentResults });
        } catch (error) {
            console.error("Error fetching student results:", error);
            res.status(400).json({ error: "Unable to fetch student results!" });
        }
    }

    static async getPaymentsByUserId(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);

            if (isNaN(userId)) {
                res.status(400).json({ error: "Invalid user ID" });
            }
            console.log("userId in con" , userId);
            
            const payments = await StudentService.getPaymentsByUserId(userId);
            res.status(200).json({ payments });
        } catch (error) {
            console.error("Error fetching payments:",( error as Error).message);
            res.status(400).json({ error: "Unable to fetch payments" });
        }
    }
}

