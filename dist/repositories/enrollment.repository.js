"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentRepository = void 0;
const data_source_1 = require("../config/data-source");
const enrollment_1 = require("../entities/enrollment");
exports.EnrollmentRepository = data_source_1.AppDataSource.getRepository(enrollment_1.Enrollment);
