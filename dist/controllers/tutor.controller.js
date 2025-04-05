"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorController = void 0;
const tutor_service_1 = require("../services/tutor.service");
class TutorController {
    static createNewCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseDTO = req.body; // Extract course details from the request body
                const course = yield tutor_service_1.TutorService.createNewCourse(courseDTO);
                res.status(201).json({ message: "New Course created successfully", course });
            }
            catch (error) {
                res.status(400).json({ error: "Unable to create course!" });
            }
        });
    }
    static getCourseContentsByCourseId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("------------------------------------");
                const courseId = Number(req.params.id);
                console.log("const courseId= Number(req.params.id);S");
                console.log(`Course content by courseId: ${courseId}`);
                const courseContents = yield tutor_service_1.TutorService.getCourseContentsByCourseId(courseId);
                console.log("-----------------", courseContents);
                res.status(200).json(courseContents);
            }
            catch (error) {
                res.status(400).json({ error: "Unable to retrieve course contents!" });
            }
        });
    }
    static getCoursesByCreatorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const creatorId = parseInt(req.params.id, 10);
                const courses = yield tutor_service_1.TutorService.getCoursesByCreatorId(creatorId);
                res.status(200).json(courses);
            }
            catch (error) {
                res.status(400).json({ error: "Unable to retrieve courses!" });
            }
        });
    }
    static createNewCourseContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseContentDTO = req.body; // Extract course content details from the request body
                const courseContent = yield tutor_service_1.TutorService.createNewCourseContent(courseContentDTO);
                res.status(201).json({ message: "New Course Content created successfully", courseContent });
            }
            catch (error) {
                res.status(400).json({ error: "Unable to create course content!" });
            }
        });
    }
    static removeCourseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseId = Number(req.params.id);
                yield tutor_service_1.TutorService.removeCourseById(courseId);
                res.status(201).json({ message: "Course deleted successfully!" });
            }
            catch (error) {
                res.status(400).json({ error: "Unable to delete course!" });
            }
        });
    }
    static createNewQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quizDTO = req.body; // Extract quiz details from the request body
                const quiz = yield tutor_service_1.TutorService.createNewQuiz(quizDTO);
                res.status(201).json({ message: "New Quiz created successfully", quiz });
            }
            catch (error) {
                res.status(400).json({ error: "Unable to create quiz!" });
            }
        });
    }
    // static async createNewQuiz1(req: Request, res: Response) {
    //     try {
    //         const quizDTO: QuizDTO1 = req.body; // Extract quiz details from the request body
    //         const quiz = await TutorService.createNewQuiz1(quizDTO);
    //         res.status(201).json({ message: "New Quiz created successfully", quiz });
    //     } catch (error) {
    //         res.status(400).json({ error: "Unable to create quiz!" });
    //     }
    // }
    static createResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultDTO = req.body;
                const result = yield tutor_service_1.TutorService.createResult(resultDTO);
                res.status(201).json({ message: "New Result created successfully", result });
            }
            catch (error) {
                res.status(400).json({ error: "Unable to create result!" });
            }
        });
    }
}
exports.TutorController = TutorController;
