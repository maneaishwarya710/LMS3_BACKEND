import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { User } from "../entities/user";
import { UserRepository } from "../repositories/user.repository";
import { RegisterDTO } from "../dto/register.dto";
import { LoginDTO } from "../dto/login.dto";
import dotenv from "dotenv";
import { UserProfileDTO } from "../dto/profile.dto";

const secretKey = "JNC";

dotenv.config();

export class UserService {
    static async register(data: RegisterDTO) {
        const { username, email, password, userType } = data;
        const existingUser = await UserRepository.findOne({
            where: { email }
        });
        if (existingUser) throw new Error("User already exists");
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = UserRepository.create({
            username, email, password:
                hashedPassword, userType
        });
        return await UserRepository.save(newUser);
    }
    static async login(data: LoginDTO) {
        const { username, password } = data;
        const user = await UserRepository.findOne({ where: { username } });
        console.log(user);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Invalid email or password");
        }
        const token = jwt.sign({ userId:user.userId, username: user.username, password:user.password }, secretKey, {
            expiresIn: "1d"
        });
        console.log(user)
        return { token, user };
    }

    static async findUserById(userId:number){
        const user = await UserRepository.findOne({ where: { userId } });
        if (!user) {
            throw new Error("No user found!");
        }
        return user;
    }

    static async getUserProfile(userId: number): Promise<UserProfileDTO> {
        
        const user = await UserRepository.findOne({
          where: { userId },
          relations: ["enrollments", "payments", "results"]
        });
    
        if (!user) {
          throw new Error("User not found");
        }
    
        const userProfile: UserProfileDTO = {
          userId: user.userId,
          username: user.username,
          email: user.email,
          userType: user.userType
        };
    
        return userProfile;
      }

}
