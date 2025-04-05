"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerRepository = void 0;
const data_source_1 = require("../config/data-source");
const answer_1 = require("../entities/answer");
exports.answerRepository = data_source_1.AppDataSource.getRepository(answer_1.Answer);
