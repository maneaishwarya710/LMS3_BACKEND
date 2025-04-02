import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDTO {
    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}