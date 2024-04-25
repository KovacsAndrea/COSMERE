import { Book } from "../model/book.tsx";
import { MongoBookRepo } from "../repo/mongoBookRepo.tsx";

export class MongoBookServ {
    private bookRepo: MongoBookRepo;

    constructor(bookRepo: MongoBookRepo) {
        this.bookRepo = bookRepo;
    }

    public async getAllBooks(){
        const books = await this.bookRepo.getAllBooks();
        return books;
    }

    async containsBook(id: string): Promise<boolean> {
        return await this.bookRepo.containsBook(id);
    }

    public async getBookById(id: string) {
        const book = await this.bookRepo.getBookById(id);
        return book;
    }

    public async getBooksByName(searchText: string) {
        return await this.bookRepo.getBooksByName(searchText);
    }

    public async addBook(book: Book): Promise<boolean> {
        return await this.bookRepo.addBook(book);
    }

    public async deleteBook(id: string): Promise<boolean> {
        return await this.bookRepo.deleteBook(id);
    }

    public async updateBook(book: Book): Promise<boolean> {
        return await this.bookRepo.updateBook(book);
    }

    public async getFilteredBooks(filter?: any) {
        return await this.bookRepo.getFilteredBooks(filter);
    }

    public async getAllSortedBooks(filter?: any, sort?: any){
        return await this.bookRepo.getAllSortedBooks(filter, sort);
    }

    public length(): number {
        return this.bookRepo.length();
    }
}