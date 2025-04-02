import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { LoginDTO } from "../dto/login.dto";
import { RegisterDTO } from "../dto/register.dto";
import { validate } from "class-validator";
export class UserController {
    static async register(req: Request, res: Response) {
        const dto = new RegisterDTO();
        Object.assign(dto, req.body);
        const errors = await validate(dto);
        if (errors.length > 0) res.status(400).json(errors);
        try {
            const user = await UserService.register(dto);
            res.status(201).json({ message: "User registered!", user });
        } catch (error) {
            res.status(400).json({ error: "User not registered!" });
        }
    }
    static async login(req: Request, res: Response) {
        const dto = new LoginDTO();
        Object.assign(dto, req.body);
        const errors = await validate(dto);
        if (errors.length > 0) res.status(400).json(errors);
        try {
            const result = await UserService.login(dto);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: "Login Failed!" });
        }
    }

    static async findUserById(req: Request, res: Response) {
        const id = Number(req.params.id);
        try {
            const user = await UserService.findUserById(id);
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: "User not Found!" });
        }
    }

    static async getUserProfile(req: Request, res: Response) {
        const id = Number(req.params.id);
        try {
            const userProfile = await UserService.getUserProfile(id);
            res.json(userProfile);
        } catch (error) {
            res.status(400).json({ error: "User not found!" });
        }
    }

}

