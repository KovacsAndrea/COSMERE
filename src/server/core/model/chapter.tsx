export class Chapter {
    private _id: string;
    private _book_id: string;
    private _chapter_number: number;
    private _title: string;
    private _description: string; 
    private _wordcount: number;
    private _pov: string;

    constructor(id: string, book_id: string, chapter_number: number, title: string, description: string, wordcount: number, pov: string) {
        this._id = id;
        this._book_id = book_id;
        this._chapter_number = chapter_number;
        this._title = title;
        this._description = description;
        this._wordcount = wordcount;
        this._pov = pov;
    }

    set id(id: string) {
        this._id = id;
    }

    set book_id(book_id: string) {
        this._book_id = book_id;
    }

    set chapter_number(chapter_number: number){
        this._chapter_number = chapter_number
    }

    set title(title: string) {
        this._title = title;
    }

    set description(description: string) {
        this._description = description;
    }

    set wordcount(wordcount: number) {
        this._wordcount = wordcount;
    }

    set pov(pov: string) {
        this._pov = pov;
    }

    // Getters
    get id(): string {
        return this._id;
    }

    get book_id(): string {
        return this._book_id;
    }

    get chapter_number(): number {
        return this._chapter_number;
    }

    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
    }

    get wordcount(): number {
        return this._wordcount;
    }

    get pov(): string {
        return this._pov;
    }

    toString(): string {
        return `Ch.${this._chapter_number}: ${this._title}`;
    }

}