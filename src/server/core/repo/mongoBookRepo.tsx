import { ObjectId } from "mongodb";
import { collections } from "../../../database.service";
import { Book } from "../model/book";

export class MongoBookRepo {

    public async getAllBooks() {
        const books = await collections.books?.find({}).toArray();
        console.log("Mongo Books in Repo: " + books)
        return books;
    }

    public async getBookById(id: string)  {
        console.log("RECIEVED ID: , TRYING TO FETCH BOOK" + id)
        const book = await collections.books?.findOne({ _id: new ObjectId(id) });
        console.log("Recieved book: " + book)
        return book;
    }

    public async containsBook(id: string) {
        const book = await collections.books?.findOne({ _id: new ObjectId(id) })
        return !!book;
    }

    public getMockBook(id: string): Book {
        return new Book(new ObjectId(id), '', '', '', '', '', 0);
    }

    public async getBooksByName(searchText: string){
        const regex = new RegExp(searchText, 'i');
        const books = await collections.books?.find({ _title: regex }).toArray();
        return books;
    }

    public async addBook(book: Book): Promise<boolean> {
        try {
            await collections.books?.insertOne(book);
            return true;
        } catch (error) {
            console.error("Error adding book:", error);
            return false;
        }
        
    }

    public async updateFilterData(_book: Book){
        ///add remove stuff in the filter table
    }

    public async updateCurrentFilterData(_book: Book){
        ///add or remove stuff in the filter table

    }

    public async deleteBook(id: string): Promise<boolean> {
        try {
            const result = await collections.books?.deleteOne({ _id: new ObjectId(id) });
            return result?.deletedCount === 1;
        } catch (error) {
            console.error("Error deleting book:", error);
            return false;
        }
    }

    public async updateBook(book: Book): Promise<boolean> {
        try {
            const result = await collections.books?.replaceOne({ _id: book._id }, book);
            return result?.modifiedCount === 1;
        } catch (error) {
            console.error("Error updating book:", error);
            return false;
        }
    }

    public async getFilteredBooks(filter?: any) {
        try {
            const query = filter || {}; // Use provided filter or an empty object if not provided
            const books = await collections.books?.find(query).toArray();
            return books; // Map documents to Book objects
        } catch (error) {
            console.error("Error retrieving books:", error);
            return [];
        }
    }

    public async getAllSortedBooks(filter?: any, sort?: any) {
        try {
            const query = filter || {}; 
            let books = await collections.books?.find(query);
            if (books && sort) {
                books = books.sort(sort);
            }  
            return books; // Map documents to Book objects
        } catch (error) {
            console.error("Error retrieving sorted books:", error);
            return [];
        }
    }



    // private mapToBook(doc: any): Book {
    //     return new Book(
    //         doc._bookID,
    //         doc._title,
    //         doc._description,
    //         doc._planet,
    //         doc._system,
    //         doc._shard,
    //         doc._startDate,
    //         doc._id
    //     );
    // }

    public length(): number {
        return 1;
    }
}