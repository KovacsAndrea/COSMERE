import { AJPEChapters, SSFHChapters, TSMChapters, WSIChapters, WSIIChapters, WSIIIChapters, bomChapters, dsChapters, edChapters, elChapters, lmChapters, obChapters, rowChapters, shChapters, soChapters, tEMChapters, tHoAChapters, tHoEChapters, tWoAChapters, teSChapters, tfeChapters, tressChapters, wbChapters, wokChapters, worChapters, yumiChapters } from "../dummyData/chaptersData";
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
        this._chapters = ([] as Chapter[]).concat(
            ...wokChapters,
            ...worChapters,
            ...obChapters,
            ...rowChapters,
            ...edChapters,
            ...dsChapters,
            ...tfeChapters,
            ...tWoAChapters,
            ...tHoAChapters,
            ...shChapters,
            ...soChapters,
            ...bomChapters,
            ...lmChapters,
            ...yumiChapters,
            ...tressChapters,
            ...wbChapters,
            ...elChapters,
            ...tHoEChapters,
            ...teSChapters,
            ...tEMChapters,
            ...AJPEChapters,
            ...WSIChapters,
            ...WSIIChapters,
            ...WSIIIChapters,
            ...SSFHChapters,
            ...TSMChapters,
        )
    }

    public getChaptersForBookId(bookId: string): Chapter[] {
        let bookChapters = this._chapters.filter(chapter => chapter.book_id === bookId)
        return bookChapters;
    }

    public getChapterById(chapterId: string){
        let bookChapter = this._chapters.find(chapter => chapter.id === chapterId)
        return bookChapter;
    }

    public getChapterFormat(bookId: string): string {
        let bookChapters = this._chapters.filter(chapter => chapter.book_id === bookId);
        let formattedChapters: string[] = [];
    
        bookChapters.forEach(chapter => {
            let formattedChapter = `Ch.${chapter.chapter_number}: ${chapter.title}`;
            formattedChapters.push(formattedChapter);
        });
    
        return formattedChapters.join(', ');
    }
}