import { AppDataSource } from "../config/data-source";
import { Option } from "../entities/option";
export const optionRepository=AppDataSource.getRepository(Option);