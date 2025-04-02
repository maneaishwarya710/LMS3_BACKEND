"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const data_source_1 = require("../config/data-source");
const payment_1 = require("../entities/payment");
exports.PaymentRepository = data_source_1.AppDataSource.getRepository(payment_1.Payment);
