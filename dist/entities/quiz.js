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
exports.Quiz = void 0;
const typeorm_1 = require("typeorm");
const course_1 = require("./course");
const result_1 = require("./result");
let Quiz = class Quiz {
};
exports.Quiz = Quiz;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Quiz.prototype, "quizId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quiz.prototype, "quizName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, default: "default_description" }),
    __metadata("design:type", String)
], Quiz.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Quiz.prototype, "totalmarks", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_1.Course, (course) => course.quizzes, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "courseId" }),
    __metadata("design:type", course_1.Course)
], Quiz.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => result_1.Result, (result) => result.quiz, { cascade: true }),
    __metadata("design:type", Array)
], Quiz.prototype, "results", void 0);
exports.Quiz = Quiz = __decorate([
    (0, typeorm_1.Entity)("Quiz_LMS")
], Quiz);
