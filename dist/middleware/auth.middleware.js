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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleBasedAccess = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("../services/user.service");
const secretKey = "JNC";
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Access denied. No token provided." });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        console.log("Decoded token payload:", decoded);
        console.log("Token from header:", token);
        console.log("username from payload:", decoded.username); //everything is good till here
        const freshUser = yield user_service_1.UserService.findUserById(decoded.userId);
        console.log("user from decoded header:", freshUser);
        req.user = freshUser;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Invalid token." });
    }
});
exports.authenticateUser = authenticateUser;
const roleBasedAccess = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        console.log(user);
        console.log(user.userType);
        if (!user || !roles.includes(user.userType)) {
            res.status(401).json({ message: "Don't have access to this route" });
            return;
        }
        next();
    };
};
exports.roleBasedAccess = roleBasedAccess;
