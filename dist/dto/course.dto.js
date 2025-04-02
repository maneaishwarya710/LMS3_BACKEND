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
exports.CourseDTO = void 0;
const class_validator_1 = require("class-validator");
class CourseDTO {
}
exports.CourseDTO = CourseDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Course ID is required' }),
    __metadata("design:type", Number)
], CourseDTO.prototype, "courseId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Course name is required' }),
    __metadata("design:type", String)
], CourseDTO.prototype, "courseName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Description is required' }),
    (0, class_validator_1.MinLength)(10, { message: 'Description must be at least 10 characters long' }),
    (0, class_validator_1.MaxLength)(500, { message: 'Description must be at most 500 characters long' }),
    __metadata("design:type", String)
], CourseDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Price is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Price must be a number' }),
    (0, class_validator_1.IsPositive)({ message: 'Price must be a positive number' }),
    __metadata("design:type", Number)
], CourseDTO.prototype, "price", void 0);
