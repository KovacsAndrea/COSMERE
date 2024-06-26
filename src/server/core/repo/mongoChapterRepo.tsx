import { ObjectId } from "mongodb";
import { collections } from "../../../database.service";
import { Chapter } from "../model/chapter";
import { obChapters, rowChapters, wokChapters, worChapters } from "../dummyData/mongoDummy";

export class MongoChapterRepo {
    
    public async getChaptersByBookId(bookId: string) {
        const result = await collections.chapterCollection?.
        find({_book_id: new ObjectId(bookId)})
        .sort({ _chapter_number: 1 })
        .toArray()
        return result;
    }

    public async getChapterByID(chapterId: string) {
        const result = await collections.chapterCollection?.findOne({_id: new ObjectId(chapterId)})
        return result
    }

    public async getAllChapters(){
        const result = await collections.chapterCollection?.find({}).toArray();
        return result;
    }

    public async addChapter(chapter: Chapter) {
        const result = await collections.chapterCollection?.insertOne(chapter)
        return result;
    }
    
    public async deleteChapter(chapterId: string){
        const result = await collections.chapterCollection?.deleteOne({_id: new ObjectId(chapterId) })
        return result;
    }

    public async getChapterFormat(bookId: string) {
        const chapters = await collections.chapterCollection?.find({_book_id: new ObjectId(bookId)})
        .sort({ _chapter_number: 1 })
        .toArray()
        let formattedChapters: string[] = [];
        chapters?.forEach(chapter => {
            let formattedChapter = `Ch.${chapter._chapter_number}: ${chapter._title}`;
            formattedChapters.push(formattedChapter);
        });
    
        return formattedChapters.join(', ');
    }

    public async resetChapters(){
        const deleteCount = await collections.chapterCollection?.deleteMany({});
        console.log(deleteCount)
        const wok = await collections.books.findOne({_title: "The Way of Kings"})
        wokChapters.forEach(async chapter => {
            let addableChapter = new Chapter(
                new ObjectId, 
                wok._id, 
                chapter._chapter_number,
                chapter._title,
                chapter._description,
                chapter._wordcount,
                chapter._pov
            )
            const result = await collections.chapterCollection?.insertOne(addableChapter)
            console.log(result)
        })

        const wor = await collections.books.findOne({_title: "Words of Radiance"})
        worChapters.forEach(async chapter => {
            let addableChapter = new Chapter(
                new ObjectId, 
                wor._id, 
                chapter._chapter_number,
                chapter._title,
                chapter._description,
                chapter._wordcount,
                chapter._pov
            )
            const result = await collections.chapterCollection?.insertOne(addableChapter)
            console.log(result)
        })

        const ob = await collections.books.findOne({_title: "Oathbringer"})
        obChapters.forEach(async chapter => {
            let addableChapter = new Chapter(
                new ObjectId, 
                ob._id, 
                chapter._chapter_number,
                chapter._title,
                chapter._description,
                chapter._wordcount,
                chapter._pov
            )
            const result = await collections.chapterCollection?.insertOne(addableChapter)
            console.log(result)
        })

        
        const row = await collections.books.findOne({_title: "Rhythm of War"})
        rowChapters.forEach(async chapter => {
            let addableChapter = new Chapter(
                new ObjectId, 
                row._id, 
                chapter._chapter_number,
                chapter._title,
                chapter._description,
                chapter._wordcount,
                chapter._pov
            )
            const result = await collections.chapterCollection?.insertOne(addableChapter)
            console.log(result)
        })

        return deleteCount;

    }
    
}