"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const appError_1 = require("../utils/appError");
const errorMiddleware = (err, req, res, next) => {
    console.error("Error:", err.message);
    if (err instanceof appError_1.AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    res.status(500).json({
        status: "error",
        message: "Something went wrong!",
    });
};
exports.errorMiddleware = errorMiddleware;
