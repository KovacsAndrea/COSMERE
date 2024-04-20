import { REGEX } from "../dummyData/regex.tsx";
import { Book } from "./book.tsx";

export class BookValidator {

    public isValidIdForNewBook(id: string, listOfIds: string[]): boolean {
        return REGEX.id.test(id) && !listOfIds.includes(id);
    }

    public isValidContentForNewBook(content:string): boolean {
        return REGEX.content.test(content)
    }

    public isValidStartDateForNewBook(content: string): boolean {
        return REGEX.startDate.test(content) 
    }

    public isValidNewBook(book: Book, listOfIds: string[]): boolean {
        return this.isValidIdForNewBook(book.id, listOfIds) &&
        this.isValidContentForNewBook(book.title) &&
        this.isValidContentForNewBook(book.description) &&
        this.isValidContentForNewBook(book.planet) &&
        this.isValidContentForNewBook(book.system) &&
        this.isValidContentForNewBook(book.shard) &&
        this.isValidStartDateForNewBook(book.startDate.toString())
    }
}