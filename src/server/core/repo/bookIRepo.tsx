import { Book } from "../model/book.tsx";


export interface BookIRepo {
    useDummyData(): void;
    getAllBooks(): Book[];
    containsBook(id: string): boolean;
    getBookById(id: string): Book|undefined;
    getBooksByName(searchText: string): Book[];
    getMockBook(id: string): Book;
    addBook(book: Book): void;
    updateBook(book: Book): void;
    deleteBook(id: string): void;
    length(): number;
}