
import {describe, expect, it} from "vitest"
import { emptyBook, theWayOfKings, theWayOfKings2, theWayOfKingsId } from "../testData/testBooksData.tsx"
import { wokChapters } from "../../server/core/dummyData/chaptersData.tsx"
//npm test
describe ("testBook", () => {
    it("Tests empty book", () => {
        expect(emptyBook.id).toBe('')
        expect(emptyBook.title).toBe('')
        expect(emptyBook.description).toBe('')
        expect(emptyBook.chapters).toStrictEqual([])
        expect(emptyBook.planet).toBe('')
        expect(emptyBook.system).toBe('')
        expect(emptyBook.shard).toBe('')
        expect(emptyBook.startDate).toBe(0)
    })
    it("Tests a correct book", () => {
        expect(theWayOfKings.id).toBe('1')
        expect(theWayOfKings.title).toBe('The Way of Kings')
        expect(theWayOfKings.description).toBe('The first book in The Stormlight Archive series')
        expect(theWayOfKings.chapters).toStrictEqual(wokChapters)
        expect(theWayOfKings.planet).toBe('Roshar')
        expect(theWayOfKings.system).toBe('Rosharan System')
        expect(theWayOfKings.shard).toBe('Honor')
        expect(theWayOfKings.startDate).toBe(104)
    })

    it("Tests equals", () => {
        expect(theWayOfKings.equals(theWayOfKings2)).toBeTruthy();
        expect(theWayOfKings.equals(theWayOfKingsId)).toBeFalsy();
        expect(theWayOfKings.equals(theWayOfKingsId)).toBeFalsy();
    })

    
})