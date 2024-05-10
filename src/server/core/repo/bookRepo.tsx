import { Book } from "../model/book.tsx";
import { dummyRafo } from "../dummyData/booksData.tsx";
import { BookIRepo } from "./bookIRepo.tsx";
import { ObjectId } from "mongodb";

export class BookRepo implements BookIRepo{
    private rafo: Book[];

    constructor(){
        this.rafo = [];
    }

    public getAllBooks(): Book[] {
        return this.rafo;

    }

    public useLocalData(): void {
        this.rafo = dummyRafo
    }

    public useCloudData(bookList: any): void {
        this.rafo = bookList;
    }

    public containsBook(id: string): boolean {
        const book = this.rafo.find((obj) => {
            return obj._id.toString() === id.toString();
        })
        return (book != undefined)
    }

    public getBookById(id: string) {
        if(this.containsBook(id)){
            return this.rafo.find((obj) => obj._id.toString() === id)
        }
    }

    public getMockBook(id: string): Book {
        return new Book(new ObjectId(id), '', '', '', '', '', 0)
    }

    public getBooksByName(searchText: string): Book[] {
        let books: Book[] = [];
        books = this.rafo.filter(book => book._title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
        return books;
    }

    public addBook(book: Book): void{
        if(!this.containsBook(book._id.toString())) this.rafo.push(book);
    }

    public deleteBook(id: string){
        if(this.containsBook(id)) {
            this.rafo = this.rafo.filter(obj => obj._id.toString() !== id);
        }
    }

    public updateBook(book: Book): void {
        if(!this.containsBook(book._id.toString())){return}
        this.deleteBook(book._id.toString());
        this.addBook(book);
    }


    public length(): number {
        return this.rafo.length;
    }
}
