import { BookRepo } from "../core/repo/bookRepo";
import { BookServ } from "../core/service/bookServ";
import { DataValidator } from "../core/model/dataValidator";

const rafoRepo = new BookRepo();
rafoRepo.useDummyData();
export const rafoServ = new BookServ(rafoRepo)
export const dataValidator = new DataValidator();
