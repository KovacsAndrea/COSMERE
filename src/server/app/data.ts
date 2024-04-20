import { BookRepo } from "../core/repo/bookRepo";
import { BookServ } from "../core/service/bookServ";
import { DataValidator } from "../core/model/dataValidator";
import { ChapterRepo } from "../core/repo/chapterRepo";

const rafoRepo = new BookRepo();
rafoRepo.useDummyData();
export const rafoServ = new BookServ(rafoRepo)
export const dataValidator = new DataValidator();
export const chapterRepo = new ChapterRepo();
chapterRepo.useDummyData()