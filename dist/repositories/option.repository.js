"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionRepository = void 0;
const data_source_1 = require("../config/data-source");
const option_1 = require("../entities/option");
exports.optionRepository = data_source_1.AppDataSource.getRepository(option_1.Option);
