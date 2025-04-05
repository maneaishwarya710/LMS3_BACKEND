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
import { QuizDTO1 } from "../dto/quiz1.dto";
dotenv.config();

export class TutorService {
    static async createNewCourse(courseDTO: CourseDTO): Promise<CourseDTO>{

        const newCourse = courseRepository.create({
            courseName: courseDTO.courseName,
            imgurl:courseDTO.imgurl,
            description: courseDTO.description,
            price: courseDTO.price,
            user:{
                userId:courseDTO.creatorId
            }
            
        });
        const savedCourse = await courseRepository.save(newCourse);

        return {
            courseId: savedCourse.courseId,
            courseName: savedCourse.courseName,
            imgurl:savedCourse.imgurl,
            description: savedCourse.description,
            price: savedCourse.price,
            creatorId:courseDTO.creatorId
            
        };
    }

    static async getCoursesByCreatorId(creatorId: number): Promise<Course[]> {
        const courses = await courseRepository.find({ where: { user: { userId: creatorId } } });
        return courses;
     }

    static async getCourseContentsByCourseId(courseId: number) {
        return await courseContentRepository.find({ where: { course: { courseId:courseId } } });
       
      }
    
    //Fetch quiz by quizId
    static async getQuizByCourseId(courseId: number) {
        return await QuizRepository.find({ where: { course: { courseId:courseId } } });
    }
    
    static async createNewCourseContent(courseContentDTO: CourseContentDTO): Promise<CourseContentDTO> {
        const newCourseContent = courseContentRepository.create({
            contentType: courseContentDTO.contentType,
            content: courseContentDTO.content,
            course: { courseId: courseContentDTO.courseId } 
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
            course: { courseId: quizDTO.courseId },
            
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


    //new createQuiz method
    // static async createNewQuiz1(quizDTO: QuizDTO1): Promise<QuizDTO1> {
    //     const newQuiz = QuizRepository.create({
    //         quizName: quizDTO.quizName,
    //         description: quizDTO.description,
    //         totalmarks: quizDTO.totalmarks,
    //         course: { courseId: quizDTO.courseId },
    //         user:{
    //             userId:quizDTO.creatorId
    //         }
    //     });

    //     const savedQuiz = await QuizRepository.save(newQuiz);

    //     return {
    //         quizId: savedQuiz.quizId,
    //         quizName: savedQuiz.quizName,
    //         description: savedQuiz.description,
    //         totalmarks: savedQuiz.totalmarks,
    //         courseId: savedQuiz.course.courseId,
    //         creatorId: savedQuiz.user.userId
    //     };
    // }

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
