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
exports.StudentController = void 0;
const student_service_1 = require("../services/student.service");
class StudentController {
    static enroll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enrollmentDTO = req.body;
                const savedEnrollment = yield student_service_1.StudentService.enroll(enrollmentDTO);
                res.status(200).json({ message: "Enrollment successful", savedEnrollment });
            }
            catch (error) {
                console.error("Error enrolling:", error);
                res.status(400).json({ error: "Unable to enroll!" });
            }
        });
    }
    static getEnrolledCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const enrolledCourses = yield student_service_1.StudentService.getEnrolledCourses(+userId);
                res.status(200).json({ enrolledCourses });
            }
            catch (error) {
                console.error("Error fetching enrolled courses:", error);
                res.status(400).json({ error: "Unable to fetch enrolled courses!" });
            }
        });
    }
    static getStudentResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id; // Assuming user ID is available in the request object
                const studentResults = yield student_service_1.StudentService.getStudentResults(+userId);
                res.status(200).json({ studentResults });
            }
            catch (error) {
                console.error("Error fetching student results:", error);
                res.status(400).json({ error: "Unable to fetch student results!" });
            }
        });
    }
    static getPaymentsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                if (isNaN(userId)) {
                    return res.status(400).json({ error: "Invalid user ID" });
                }
                const payments = yield student_service_1.StudentService.getPaymentsByUserId(userId);
                res.status(200).json({ payments });
            }
            catch (error) {
                console.error("Error fetching payments:", error);
                res.status(400).json({ error: "Unable to fetch payments" });
            }
        });
    }
}
exports.StudentController = StudentController;
