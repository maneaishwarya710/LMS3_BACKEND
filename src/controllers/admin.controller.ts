import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";
import { UserDTO } from "../dto/user.dto";
import { validate } from "class-validator";
export class AdminController {
    static async viewAllUsers(req: Request, res: Response) {
        try {
            const users = await AdminService.viewAllUsers();
            res.status(201).json({ message: "Users:", users });
        } catch (error) {
            res.status(400).json({ error: "Unable to view users!" });
        }
    }

    static async deleteUserById(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            await AdminService.deleteUserById(userId);
            res.status(201).json({ message: "User deleted successfully!" });
        } catch (error) {
            res.status(400).json({ error: "Unable to delete user!" });
        }
    }

    static async addUser(req: Request, res: Response) {
        const dto = new UserDTO();
        Object.assign(dto, req.body);
        const errors = await validate(dto);
        if (errors.length > 0) res.status(400).json(errors);
        try {
            const user = await AdminService.addUser(dto);
            res.status(201).json({ message: "User added!", user });
        } catch (error) {
            res.status(400).json({ error: "User not added!" });
        }
    }

    static async checkPaymentList(req: Request, res: Response) {
        try {
            const payments = await AdminService.paymentList();
            res.status(201).json({ message: "Payments:", payments });
        } catch (error) {
            res.status(400).json({ error: "Unable to view payment list!" });
        }
    }

    static async checkEnrollmentList(req: Request, res: Response) {
        try {
            const enrollments = await AdminService.enrollmentList();
            res.status(201).json({ message: "Enrollments:", enrollments });
        } catch (error) {
            res.status(400).json({ error: "Unable to view enrollment list!" });
        }
    }
}

