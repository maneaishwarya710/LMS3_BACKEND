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
exports.Answer = void 0;
const typeorm_1 = require("typeorm");
const quizAttempt_1 = require("./quizAttempt");
const question_1 = require("./question");
let Answer = class Answer {
};
exports.Answer = Answer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Answer.prototype, "answerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Answer.prototype, "attemptId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Answer.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Answer.prototype, "selectedOptionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quizAttempt_1.QuizAttempt, (attempt) => attempt.answers),
    (0, typeorm_1.JoinColumn)({ name: "attemptId" }),
    __metadata("design:type", quizAttempt_1.QuizAttempt)
], Answer.prototype, "attempt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_1.Question, (question) => question.answers),
    (0, typeorm_1.JoinColumn)({ name: "questionId" }),
    __metadata("design:type", question_1.Question)
], Answer.prototype, "question", void 0);
exports.Answer = Answer = __decorate([
    (0, typeorm_1.Entity)()
], Answer);
