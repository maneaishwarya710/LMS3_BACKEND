"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyRepository = void 0;
const data_source_1 = require("../config/data-source");
const discussion_rename_entity_1 = require("../entities/discussion-rename.entity");
exports.replyRepository = data_source_1.AppDataSource.getRepository(discussion_rename_entity_1.DiscussionReply);
