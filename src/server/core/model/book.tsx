
import { ObjectId } from "mongodb";

export class Book{
    public _id: ObjectId;
    private _title: string;
    private _description: string;
    private _planet: string;
    private _system: string;
    private _shard: string; 
    private _startDate: number; 

    constructor(
        _id: ObjectId,
        title: string,
        description: string,
        planet: string,
        system: string,
        shard: string, 
        startDate: number
        ){
            this._id = _id;
            this._title = title;
            this._description = description;
            this._planet = planet; 
            this._system = system;
            this._shard = shard;
            this._startDate = startDate; 
        }

    

    public get id(){
        return this._id.toString();
    }

    public get title(){
        return this._title;
    }

    public get description(){
        return this._description;
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

    public set id(id: string){
        this._id = new ObjectId(id);
    }

    public set title(title: string){
        this._title = title;
    }

    public set description(description: string){
        this._description = description;
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
    public equals(other: Book): boolean {
        if (!other) return false; 
        return this.id == other.id &&
               this.title === other.title &&
               this.description === other.description &&
               this.planet === other.planet &&
               this.system === other.system &&
               this.shard === other.shard &&
               this.startDate === other.startDate;
    }

    public toString(): string {
        return `${this.title}:\n 
        Description: ${this.description}\n 
        Planet: ${this.planet}\n 
        System: ${this.system}\n 
        Shard: ${this.shard}\n 
        Start Date: ${this.startDate}\n`;
    }

}
