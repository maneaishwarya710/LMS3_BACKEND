"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultRepository = void 0;
const data_source_1 = require("../config/data-source");
const result_1 = require("../entities/result");
exports.ResultRepository = data_source_1.AppDataSource.getRepository(result_1.Result);
