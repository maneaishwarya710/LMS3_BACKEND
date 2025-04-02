import dotenv from "dotenv";
import { CourseDTO } from "../dto/course.dto";
import { Course } from "../entities/course";
import { courseRepository } from "../repositories/course.repository";
import { CourseContentDTO } from "../dto/courseContent.dto";
import { courseContentRepository } from "../repositories/courseContent.repoisitory";
import { QuizRepository } from "../repositories/quiz.repository";
import { QuizDTO } from "../dto/quiz.dto";
import { ResultDTO } from "../dto/result.dto";
import { ResultRepository } from "../repositories/result.repository";
dotenv.config();

export class TutorService {
    static async createNewCourse(courseDTO: CourseDTO): Promise<CourseDTO> {

        const newCourse = courseRepository.create({
            courseName: courseDTO.courseName,
            description: courseDTO.description,
            price: courseDTO.price
        });

        const savedCourse = await courseRepository.save(newCourse);

        return {
            courseId: savedCourse.courseId,
            courseName: savedCourse.courseName,
            description: savedCourse.description,
            price: savedCourse.price
        };
    }

    static async createNewCourseContent(courseContentDTO: CourseContentDTO): Promise<CourseContentDTO> {
        const newCourseContent = courseContentRepository.create({
            contentType: courseContentDTO.contentType,
            content: courseContentDTO.content,
            course: { courseId: courseContentDTO.courseId } // Assuming courseId is provided
        });

        const savedCourseContent = await courseContentRepository.save(newCourseContent);

        return {
            contentId: savedCourseContent.contentId,
            contentType: savedCourseContent.contentType,
            content: savedCourseContent.content,
            courseId: savedCourseContent.course.courseId
        };
    }

    static async removeCourseById(courseId: number) {
        await courseRepository
            .createQueryBuilder().delete().from(Course).where("courseId = :courseId", { courseId: courseId }).execute();
    }

    static async createNewQuiz(quizDTO: QuizDTO): Promise<QuizDTO> {
        const newQuiz = QuizRepository.create({
            quizName: quizDTO.quizName,
            description: quizDTO.description,
            totalmarks: quizDTO.totalmarks,
            course: { courseId: quizDTO.courseId } // Assuming courseId is provided
        });

        const savedQuiz = await QuizRepository.save(newQuiz);

        return {
            quizId: savedQuiz.quizId,
            quizName: savedQuiz.quizName,
            description: savedQuiz.description,
            totalmarks: savedQuiz.totalmarks,
            courseId: savedQuiz.course.courseId
        };
    }

    static async createResult(resultDTO: ResultDTO): Promise<ResultDTO> {
        const newResult = ResultRepository.create({
            score: resultDTO.score,
            course: { courseId: resultDTO.courseId },
            quiz: { quizId: resultDTO.quizId },
            user: { userId: resultDTO.userId }
        });

        const savedResult = await ResultRepository.save(newResult);

        return {
            resultId: savedResult.resultId,
            score: savedResult.score,
            courseId: savedResult.course.courseId,
            quizId: savedResult.quiz.quizId,
            userId: savedResult.user.userId
        };
    }
}
