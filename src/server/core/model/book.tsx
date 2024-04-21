import { ObjectId } from "mongodb";
import { Chapter } from "./chapter";


interface BookInterface {
    id: string;
    title: string;
    description: string;
    chapters: Chapter[];
    planet: string;
    system: string;
    shard: string;
    startDate: number;
    chaptersFormat: string;

    equals(other: BookInterface): boolean;
    toString(): string;
}

export class Book implements BookInterface{
    private _id: string;
    private _title: string;
    private _description: string;
    private _chapters: Chapter[];
    private _planet: string;
    private _system: string;
    private _shard: string; 
    private _startDate: number; 
    private _chaptersFormat: string;

    constructor(id: string,
        title: string,
        description: string,
        chapters: Chapter[],
        planet: string,
        system: string,
        shard: string, 
        startDate: number){
            this._id = id;
            this._title = title;
            this._description = description;
            this._chapters = chapters;
            this._planet = planet; 
            this._system = system;
            this._shard = shard;
            this._startDate = startDate; 
            this._chaptersFormat = this.formattedChapters();
        }

    

    public get id(){
        return this._id;
    }

    public get title(){
        return this._title;
    }

    public get description(){
        return this._description;
    }

    public get chapters(){
        return this._chapters;
    }

    public get planet(){
        return this._planet;
    }

    public get system(){
        return this._system;
    }

    public get shard(){
        return this._shard;
    }

    public get startDate(){
        return this._startDate;
    }

    public get chaptersFormat(){
        return this._chaptersFormat
    }

    private formattedChapters(){
        let formattedChapters = "";
        for (let i = 0; i < this._chapters.length; i++) {
            formattedChapters += `Ch.${i + 1}: ${this._chapters[i].title}; `;
        }
        formattedChapters = formattedChapters.slice(0, -2);
        return formattedChapters;
    }




    public set id(id: string){
        this._id = id;
    }

    public set title(title: string){
        this._title = title;
    }

    public set description(description: string){
        this._description = description;
    }

    public set chapters(chapters: Chapter[]){
        this._chapters = chapters;
    }

    public set planet(planet: string){
        this.planet = planet;
    }

    public set system(system: string){
        this._system = system;
    }

    public set shard(shard: string){
        this._shard = shard;
    }

    public set startDate(startDate: number){
        this._startDate = startDate;
    }

    public set chaptersFormat(chapters: string){
        this._chaptersFormat = chapters;
    }

    public equals(other: Book): boolean {
        if (!other) return false; 
        return this.id === other.id &&
               this.title === other.title &&
               this.description === other.description &&
               this.chaptersFormat == other.chaptersFormat &&
               this.planet === other.planet &&
               this.system === other.system &&
               this.shard === other.shard &&
               this.startDate === other.startDate;
    }

    public toString(): string {
        return `${this.title}:\n 
        Description: ${this.description}\n 
        Chapters: ${this.chaptersFormat}\n 
        Planet: ${this.planet}\n 
        System: ${this.system}\n 
        Shard: ${this.shard}\n 
        Start Date: ${this.startDate}\n`;
    }

}
