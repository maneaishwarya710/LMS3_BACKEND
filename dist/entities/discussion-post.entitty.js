"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussionPost = void 0;
const typeorm_1 = require("typeorm");
const discussion_rename_entity_1 = require("./discussion-rename.entity");
const user_1 = require("./user");
let DiscussionPost = class DiscussionPost {
};
exports.DiscussionPost = DiscussionPost;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DiscussionPost.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DiscussionPost.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], DiscussionPost.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DiscussionPost.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, user => user.posts),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_1.User)
], DiscussionPost.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => discussion_rename_entity_1.DiscussionReply, reply => reply.post, { cascade: true }),
    __metadata("design:type", Array)
], DiscussionPost.prototype, "replies", void 0);
exports.DiscussionPost = DiscussionPost = __decorate([
    (0, typeorm_1.Entity)({ name: "POST_LMS" })
], DiscussionPost);
