import {describe, expect, it} from "vitest"
import { emptyRafoRepo, testRafoRepo, skyward, theWayOfKings} from "../testData/testBooksData.tsx"

describe ("testReppo", () => {
    it("Tests length", () => {
        expect(emptyRafoRepo.length()).toBe(0);
        expect(testRafoRepo.length()).toBe(26);
    })

    it("Tests get all", () => {
        expect(emptyRafoRepo.getAllBooks().length).toBe(0);
        expect(testRafoRepo.getAllBooks().length).toBe(26);
    })

    it("tests get book by id", () => {
        expect(emptyRafoRepo.getBookById('1')?.equals(theWayOfKings))
        expect(emptyRafoRepo.getBookById('53'))?.equals(undefined)
    })

    it("Tests add", () => {
        expect(emptyRafoRepo.getAllBooks().length).toBe(0);
        emptyRafoRepo.addBook(skyward)
        expect(emptyRafoRepo.getAllBooks().length).toBe(1);

        expect(testRafoRepo.getAllBooks().length).toBe(26);
        testRafoRepo.addBook(skyward)
        expect(testRafoRepo.getAllBooks().length).toBe(27);
    })

    it("Tests delete", () => {
        expect(emptyRafoRepo.getAllBooks().length).toBe(1);
        emptyRafoRepo.deleteBook(skyward.id)
        expect(emptyRafoRepo.getAllBooks().length).toBe(0);

        expect(testRafoRepo.getAllBooks().length).toBe(27);
        testRafoRepo.deleteBook(skyward.id)
        expect(testRafoRepo.getAllBooks().length).toBe(26);

        testRafoRepo.deleteBook(skyward.id)
        expect(testRafoRepo.getAllBooks().length).toBe(26);
    })

    it("Tests update", () => {
        emptyRafoRepo.addBook(skyward)
        expect(emptyRafoRepo.getBookById(skyward.id)?.description).toBe(skyward.description)
        skyward.description = "Reach beyond the stars"
        emptyRafoRepo.updateBook(skyward)
        expect(emptyRafoRepo.getBookById(skyward.id)?.description).toBe("Reach beyond the stars")
    })
})