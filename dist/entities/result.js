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
exports.Result = void 0;
const typeorm_1 = require("typeorm");
const course_1 = require("./course");
const quiz_1 = require("./quiz");
const user_1 = require("./user");
let Result = class Result {
};
exports.Result = Result;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Result.prototype, "resultId", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Result.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_1.Course, (course) => course.results),
    (0, typeorm_1.JoinColumn)({ name: "courseId" }),
    __metadata("design:type", course_1.Course)
], Result.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_1.Quiz, (quiz) => quiz.results, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "quizId" }),
    __metadata("design:type", quiz_1.Quiz)
], Result.prototype, "quiz", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.results, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", user_1.User)
], Result.prototype, "user", void 0);
exports.Result = Result = __decorate([
    (0, typeorm_1.Entity)("RESULT_LMS")
], Result);
