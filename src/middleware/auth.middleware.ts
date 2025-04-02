import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../types/auth.type";
import { UserService } from "../services/user.service";
const secretKey = "JNC";

export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = (req.headers as unknown as Record<string, string>)["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    console.log("Decoded token payload:", decoded);
    console.log("Token from header:", token);
    console.log("username from payload:", decoded.username); //everything is good till here
    const freshUser = await UserService.findUserById(decoded.userId);
    console.log("user from decoded header:", freshUser);
    req.user = freshUser;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

export const roleBasedAccess = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    console.log(user);
    console.log(user.userType);
    if (!user || !roles.includes(user.userType)) {
      res.status(401).json({ message: "Don't have access to this route" });
      return;
    }
    next();
  };
}

