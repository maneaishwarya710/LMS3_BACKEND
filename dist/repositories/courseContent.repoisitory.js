"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseContentRepository = void 0;
const data_source_1 = require("../config/data-source");
const courseContent_1 = require("../entities/courseContent");
exports.courseContentRepository = data_source_1.AppDataSource.getRepository(courseContent_1.CourseContent);
