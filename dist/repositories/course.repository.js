"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRepository = void 0;
const data_source_1 = require("../config/data-source");
const course_1 = require("../entities/course");
exports.courseRepository = data_source_1.AppDataSource.getRepository(course_1.Course);
