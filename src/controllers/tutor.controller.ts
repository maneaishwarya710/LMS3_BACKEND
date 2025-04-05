import { Request, Response } from "express";
import { TutorService } from "../services/tutor.service";
import { CourseDTO } from "../dto/course.dto";
import { validate } from "class-validator";
import { CourseContentDTO } from "../dto/courseContent.dto";
import { QuizDTO } from "../dto/quiz.dto";
import { ResultDTO } from "../dto/result.dto";
import { StudentService } from "../services/student.service";
import { QuizDTO1 } from "../dto/quiz1.dto";
export class TutorController {
    static async createNewCourse(req: Request, res: Response) {
        try {
            const courseDTO: CourseDTO = req.body; // Extract course details from the request body
            const course = await TutorService.createNewCourse(courseDTO);
            res.status(201).json({ message: "New Course created successfully", course });
        } catch (error) {
            res.status(400).json({ error: "Unable to create course!" });
        }
    }

    static async getCourseContentsByCourseId(req: Request, res: Response) {
        try {
            console.log("------------------------------------");
            
            const courseId= Number(req.params.id);
            console.log("const courseId= Number(req.params.id);S");
            
            console.log(`Course content by courseId: ${courseId}`);
            const courseContents = await TutorService.getCourseContentsByCourseId(courseId);
            console.log("-----------------",courseContents)
            res.status(200).json(courseContents);
           
            
            
        } catch (error) {
            res.status(400).json({ error: "Unable to retrieve course contents!" });
        }
    }
    

    static async getCoursesByCreatorId(req: Request, res: Response) {
        try {
            const creatorId: number = parseInt(req.params.id, 10);
            const courses = await TutorService.getCoursesByCreatorId(creatorId);
            res.status(200).json(courses);
        } catch (error) {
            res.status(400).json({ error: "Unable to retrieve courses!" });
        }
    }


    static async createNewCourseContent(req: Request, res: Response) {
        try {
            const courseContentDTO: CourseContentDTO = req.body; // Extract course content details from the request body
            const courseContent = await TutorService.createNewCourseContent(courseContentDTO);
            res.status(201).json({ message: "New Course Content created successfully", courseContent });
        } catch (error) {
            res.status(400).json({ error: "Unable to create course content!" });
        }
    }

    static async removeCourseById(req: Request, res: Response) {
        try {
            const courseId = Number(req.params.id);
            await TutorService.removeCourseById(courseId);
            res.status(201).json({ message: "Course deleted successfully!" });
        } catch (error) {
            res.status(400).json({ error: "Unable to delete course!" });
        }
    }

    static async createNewQuiz(req: Request, res: Response) {
        try {
            const quizDTO: QuizDTO = req.body; // Extract quiz details from the request body
            const quiz = await TutorService.createNewQuiz(quizDTO);
            res.status(201).json({ message: "New Quiz created successfully", quiz });
        } catch (error) {
            res.status(400).json({ error: "Unable to create quiz!" });
        }
    }

    static async createResult(req: Request, res: Response) {
        try {
            const resultDTO: ResultDTO = req.body; 
            const result = await TutorService.createResult(resultDTO);
            res.status(201).json({ message: "New Result created successfully", result });
        } catch (error) {
            res.status(400).json({ error: "Unable to create result!" });
        }
    }
}

