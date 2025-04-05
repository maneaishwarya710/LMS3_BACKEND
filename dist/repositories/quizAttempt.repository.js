"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizAttemptRepository = void 0;
const data_source_1 = require("../config/data-source");
const quizAttempt_1 = require("../entities/quizAttempt");
exports.QuizAttemptRepository = data_source_1.AppDataSource.getRepository(quizAttempt_1.QuizAttempt);
