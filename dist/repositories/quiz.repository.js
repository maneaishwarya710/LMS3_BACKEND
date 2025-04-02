"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRepository = void 0;
const data_source_1 = require("../config/data-source");
const quiz_1 = require("../entities/quiz");
exports.QuizRepository = data_source_1.AppDataSource.getRepository(quiz_1.Quiz);
