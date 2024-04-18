import {describe, expect, it} from "vitest"
import { Book } from "../../server/core/model/book.tsx";
import { rafoServ } from "../../server/app/index.ts";
import { theWayOfKings, skyward, emptyRafoServ } from "../testData/testBooksData.tsx";


describe ("testReppo", () => {
    it("Tests length", () => {
        expect(emptyRafoServ.length()).toBe(0);
        expect(rafoServ.length()).toBe(26);
    })

    it("Tests get all", () => {
        expect(emptyRafoServ.getAllBooks().length).toBe(0);
        expect(rafoServ.getAllBooks().length).toBe(9);
    })

    it("tests get book by id", () => {
        expect(emptyRafoServ.getBookById('1')?.equals(theWayOfKings))
        expect(emptyRafoServ.getBookById('50'))?.equals(undefined)
    })

    it("Tests add", () => {
        expect(emptyRafoServ.getAllBooks().length).toBe(0);
        emptyRafoServ.addBook(new Book('1', 'a', 'a', 'a', [], 'a', 'a', 'a', 3))
        expect(emptyRafoServ.getAllBooks().length).toBe(0);

        emptyRafoServ.addBook(new Book('1', 'a', 'a', 'a', [], 'a', 'a', 'a', 1999))
        expect(emptyRafoServ.getAllBooks().length).toBe(0);

        emptyRafoServ.addBook(new Book('1', 'a', 'a', 'a', [], 'a', 'a', 'a', 2000))
        expect(emptyRafoServ.getAllBooks().length).toBe(1);
    })

    it("Tests delete", () => {
        expect(emptyRafoServ.getAllBooks().length).toBe(1);
        emptyRafoServ.deleteBook("nimic")
        expect(emptyRafoServ.getAllBooks().length).toBe(1);
        emptyRafoServ.deleteBook('1')
        expect(emptyRafoServ.getAllBooks().length).toBe(0);
    })

    it("Tests update", () => {
        const book = new Book('2', 'aa', 'aa', 'aa', [], 'aa', 'aa', 'aa', 2000)
        emptyRafoServ.addBook(book)
        expect(emptyRafoServ.getBookById('2')?.description).toBe('aa')
        book.description = "bb";
        emptyRafoServ.updateBook(new Book('2', 'bb', 'bb', 'bb', [], 'aa', 'aa', 'aa', 2000))
        expect(emptyRafoServ.getBookById('2')?.description).toBe("bb")
    })

    // it("Tests ID generation", () => {
    //     expect(emptyRafoServ.getNewBookId()).toBe('1');
    //     emptyRafoServ.addBook(new Book('1', 'a', 'a', 'a', [], 'a', 'a', 'a', 3));
    //     expect(emptyRafoServ.getNewBookId()).toBe('2');
    //     emptyRafoServ.addBook(emptyRafoServ.getMockBook('3'));
    //     expect(emptyRafoServ.getNewBookId()).toBe('2');

    //     expect(rafoServ.getNewBookId()).toBe('18');
    //     rafoServ.addBook(skyward);
    //     expect(rafoServ.getNewBookId()).toBe('19');
    //     let book = rafoServ.getBookById('7')
    //     if(book){
    //         rafoServ.deleteBook(book.id)
    //         expect(rafoServ.getNewBookId()).toBe('7');
    //     }
    // })

    // it("Tests books by title", () => {
    //     let expectedList: Book[] = [];
    //     let book1 = rafoServ.getBookById('5')
    //     let book2 = rafoServ.getBookById('6')
    //     if(book1 && book2){
    //         expectedList.push(book1)
    //         expectedList.push(book2)
    //     }
    //     // expect(rafoServ.getBooksByTitle("da")).toStrictEqual(expectedList)
    //     // expect(rafoServ.getBooksByTitle("of").length).toBe(8)
    //     // expect(rafoServ.getBooksByTitle("the").length).toBe(6)
    // })

    // it("Tests getting all ids", () => {
    //     let ids = [1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18]
    //     let fuckme = ids.map(e=> e.toString())
    //     expect(rafoServ.getListofIds()).toStrictEqual(fuckme)
    // })

    // it("Tests is valid ID for new book", () => {
    //     expect(emptyRafoServ2.isValidIdForNewBook('1')).toBe(true);
    //     expect(emptyRafoServ2.isValidIdForNewBook('0')).toBe(false);
    //     expect(emptyRafoServ2.isValidIdForNewBook('001')).toBe(false);
    //     expect(emptyRafoServ2.isValidIdForNewBook('-1')).toBe(false);
    //     expect(emptyRafoServ2.isValidIdForNewBook('abc')).toBe(false);
    //     expect(emptyRafoServ2.isValidIdForNewBook('5')).toBe(true);
    // })

    // it("Tests is valid book", () => {
    //     expect(emptyRafoServ2.isValidNewBook(new Book('1','','','',[],'','','',0))).toBe(false)
    //     expect(emptyRafoServ2.isValidNewBook(new Book('1','a','a','a',[],'a','a','a',0))).toBe(true)
    //     expect(emptyRafoServ2.isValidNewBook(new Book('1','a','a','a',[],'a','a','a',1000))).toBe(true)
    //     expect(emptyRafoServ2.isValidNewBook(new Book('1','a','a','a',[],'a','a','a',-1000))).toBe(true)
    //     expect(emptyRafoServ2.isValidNewBook(new Book('1','a','a','a',[],'a','a','a',1001))).toBe(false)
    //     expect(emptyRafoServ2.isValidNewBook(new Book('1','a','a','a',[],'a','a','a',-1001))).toBe(false)
    //     emptyRafoServ2.addBook(theWayOfKings)
    //     expect(emptyRafoServ2.isValidNewBook(new Book('1','a','a','a',[],'a','a','a',0))).toBe(false)
    //     expect(emptyRafoServ2.isValidNewBook(new Book('2','a','a','a',[],'a','a','a',0))).toBe(true)
    //     expect(rafoServ.isValidNewBook(new Book('7','a','a','a',[],'a','a','a',0))).toBe(true)
    // })

    // it("Tests contains book", () =>{
    //     expect(rafoServ.containsBook('7')).toBeFalsy();
    //     expect(rafoServ.containsBook('8')).toBeTruthy();
    // })
})