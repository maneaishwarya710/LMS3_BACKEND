"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("../services/admin.service");
const user_dto_1 = require("../dto/user.dto");
const class_validator_1 = require("class-validator");
class AdminController {
    static viewAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield admin_service_1.AdminService.viewAllUsers();
                res.status(201).json({ message: "Users:", users });
            }
            catch (error) {
                res.status(400).json({ error: "Unable to view users!" });
            }
        });
    }
    static deleteUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = Number(req.params.id);
                yield admin_service_1.AdminService.deleteUserById(userId);
                res.status(201).json({ message: "User deleted successfully!" });
            }
            catch (error) {
                res.status(400).json({ error: "Unable to delete user!" });
            }
        });
    }
    static addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = new user_dto_1.UserDTO();
            Object.assign(dto, req.body);
            const errors = yield (0, class_validator_1.validate)(dto);
            if (errors.length > 0)
                res.status(400).json(errors);
            try {
                const user = yield admin_service_1.AdminService.addUser(dto);
                res.status(201).json({ message: "User added!", user });
            }
            catch (error) {
                res.status(400).json({ error: "User not added!" });
            }
        });
    }
    static checkPaymentList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield admin_service_1.AdminService.paymentList();
                res.status(201).json({ message: "Payments:", payments });
            }
            catch (error) {
                res.status(400).json({ error: "Unable to view payment list!" });
            }
        });
    }
    static checkEnrollmentList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enrollments = yield admin_service_1.AdminService.enrollmentList();
                res.status(201).json({ message: "Enrollments:", enrollments });
            }
            catch (error) {
                res.status(400).json({ error: "Unable to view enrollment list!" });
            }
        });
    }
}
exports.AdminController = AdminController;
