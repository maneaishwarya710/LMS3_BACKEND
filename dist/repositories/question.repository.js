"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRepository = void 0;
const data_source_1 = require("../config/data-source");
const question_1 = require("../entities/question");
exports.questionRepository = data_source_1.AppDataSource.getRepository(question_1.Question);
