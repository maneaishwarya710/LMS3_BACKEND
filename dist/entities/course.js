"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const typeorm_1 = require("typeorm");
const enrollment_1 = require("./enrollment");
const courseContent_1 = require("./courseContent");
const quiz_1 = require("./quiz");
const result_1 = require("./result");
let Course = class Course {
};
exports.Course = Course;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Course.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, default: "default_COURSENAME" }),
    __metadata("design:type", String)
], Course.prototype, "courseName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, default: "default_description" }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => enrollment_1.Enrollment, (enrollment) => enrollment.course, { cascade: true }),
    __metadata("design:type", Array)
], Course.prototype, "enrollments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => courseContent_1.CourseContent, (courseContent) => courseContent.course, { cascade: true }),
    __metadata("design:type", Array)
], Course.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_1.Quiz, (quiz) => quiz.course, { cascade: true }),
    __metadata("design:type", Array)
], Course.prototype, "quizzes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => result_1.Result, (result) => result.course, { cascade: true }),
    __metadata("design:type", Array)
], Course.prototype, "results", void 0);
exports.Course = Course = __decorate([
    (0, typeorm_1.Entity)("COURSE_LMS")
], Course);
