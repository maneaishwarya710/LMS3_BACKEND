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
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const login_dto_1 = require("../dto/login.dto");
const register_dto_1 = require("../dto/register.dto");
const class_validator_1 = require("class-validator");
class UserController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = new register_dto_1.RegisterDTO();
            Object.assign(dto, req.body);
            const errors = yield (0, class_validator_1.validate)(dto);
            if (errors.length > 0)
                res.status(400).json(errors);
            try {
                const user = yield user_service_1.UserService.register(dto);
                res.status(201).json({ message: "User registered!", user });
            }
            catch (error) {
                res.status(400).json({ error: "User not registered!" });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = new login_dto_1.LoginDTO();
            console.log("Logging Triggered");
            Object.assign(dto, req.body);
            const errors = yield (0, class_validator_1.validate)(dto);
            if (errors.length > 0)
                res.status(400).json(errors);
            try {
                const result = yield user_service_1.UserService.login(dto);
                res.json(result);
            }
            catch (error) {
                res.status(400).json({ error: "Login Failed!" });
            }
        });
    }
    static findUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const user = yield user_service_1.UserService.findUserById(id);
                res.json(user);
            }
            catch (error) {
                res.status(400).json({ error: "User not Found!" });
            }
        });
    }
    static getUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const userProfile = yield user_service_1.UserService.getUserProfile(id);
                res.json(userProfile);
            }
            catch (error) {
                res.status(400).json({ error: "User not found!" });
            }
        });
    }
}
exports.UserController = UserController;
