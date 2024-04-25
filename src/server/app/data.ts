import { BookRepo } from "../core/repo/bookRepo";
import { BookServ } from "../core/service/bookServ";
import { DataValidator } from "../core/model/dataValidator";
import { ChapterRepo } from "../core/repo/chapterRepo";
import { MongoBookRepo } from "../core/repo/mongoBookRepo";
import { MongoBookServ } from "../core/service/mongoBookServ";

export const rafoRepo = new BookRepo();
rafoRepo.useLocalData();
export const rafoServ = new BookServ(rafoRepo)
export const dataValidator = new DataValidator();
export const chapterRepo = new ChapterRepo();
chapterRepo.useDummyData()
export const mongoBookRepo = new MongoBookRepo();
export const mongoBookServ = new MongoBookServ(mongoBookRepo);