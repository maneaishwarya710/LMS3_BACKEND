"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const data_source_1 = require("../config/data-source");
const discussion_post_entitty_1 = require("../entities/discussion-post.entitty");
exports.postRepository = data_source_1.AppDataSource.getRepository(discussion_post_entitty_1.DiscussionPost);
