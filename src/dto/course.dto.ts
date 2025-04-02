import { IsNotEmpty, IsString, IsNumber, MinLength, MaxLength, IsPositive } from 'class-validator';

export class CourseDTO {
    @IsNotEmpty({ message: 'Course ID is required' })
    courseId: number;

    @IsNotEmpty({ message: 'Course name is required' })
    courseName: string;

    @IsNotEmpty({ message: 'Description is required' })
    @MinLength(10, { message: 'Description must be at least 10 characters long' })
    @MaxLength(500, { message: 'Description must be at most 500 characters long' })
    description: string;

    @IsNotEmpty({ message: 'Price is required' })
    @IsNumber({}, { message: 'Price must be a number' })
    @IsPositive({ message: 'Price must be a positive number' })
    price: number;
}