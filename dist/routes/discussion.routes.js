"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const discussion_controller_1 = require("../controllers/discussion.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const discRouter = express_1.default.Router();
discRouter.post('/createPost/:userId', auth_middleware_1.authenticateUser, discussion_controller_1.createPost);
discRouter.post('/addReply/:postId/:userId', auth_middleware_1.authenticateUser, discussion_controller_1.addReply);
discRouter.get('/getAllPosts', auth_middleware_1.authenticateUser, discussion_controller_1.getAllPosts);
discRouter.get('/getPostById/:id', auth_middleware_1.authenticateUser, discussion_controller_1.getPost);
exports.default = discRouter;
