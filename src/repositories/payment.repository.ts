import { AppDataSource } from "../config/data-source";
import { Payment } from "../entities/payment";


export const PaymentRepository=AppDataSource.getRepository(Payment);