import { dummyRafo } from "../dummyData/booksData";
import { Chapter } from "../model/chapter";

export class ChapterRepo{
    private _chapters: Chapter[]; 
    
    constructor() {
        this._chapters = []
    }

    public get chapters(): Chapter[] {
        return this._chapters;
    }

    public set chapters(chapters: Chapter[]) {
        this._chapters = chapters;
    }

    public useDummyData(): void {
        var chapterList = dummyRafo.flatMap(book => book.chapters)
        this._chapters = chapterList;
    }

    public getChaptersForBookId(bookId: string): Chapter[] {
        let bookChapters = this._chapters.filter(chapter => chapter.book_id === bookId)
        return bookChapters;
    }

    public getChapterById(chapterId: string){
        let bookChapter = this._chapters.find(chapter => chapter.id === chapterId)
        return bookChapter;
    }
}