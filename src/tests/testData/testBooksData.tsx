import { wokChapters } from "../../server/core/dummyData/chaptersData"
import { Book } from "../../server/core/model/book"
import { BookRepo } from "../../server/core/repo/bookRepo"
import { BookServ } from "../../server/core/service/bookServ"


export const emptyBook = new Book('', '', '', '', [], '', '', '', 0)
export const theWayOfKings =  new Book(
    '1',
    'The Way of Kings',
    'The first book in The Stormlight Archive series',
    '',
    wokChapters,
    'Roshar',
    'Rosharan System',
    'Honor',
    104)

export const theWayOfKings2 =  new Book(
    '1',
    'The Way of Kings',
    'The first book in The Stormlight Archive series',
    '',
    wokChapters,
    'Roshar',
    'Rosharan System',
    'Honor',
    104)

export const theWayOfKingsId =  new Book(
    '2',
    'The Way of Kings',
    'The first book in The Stormlight Archive series',
    '',
    wokChapters,
    'Roshar',
    'Rosharan System',
    'Honor',
    104)

export const theWayOfKingsName =  new Book(
    '1',
    'The Way of Kings',
    'The first book in The Stormlight Archive series',
    '',
    wokChapters,
    'Roshar',
    'Rosharan System',
    'Honor',
    104)

export const theWayOfKingsStartDate =  new Book(
    '1',
    'The Way of Kings',
    'The first book in The Stormlight Archive series',
    '',
    wokChapters,
    'Roshar',
    'Rosharan System',
    'Honor',
    107)
        
        
const skywardChapters = [
    'Prologue',
    'Defiant',
    'Betrayal',
    'Cataclysm',
    'Aftermath',
    'The Flame',
    'Thief',
    'Isolation',
    'Escapes',
    'Specimen',
    'Sides',
    'Maps',
    'Ignition',
    'Detritus',
    'Sacrifice',
    'Alternate',
    'Game',
    'Broken',
    'Namesake',
    'Decoy'
    ];

export const skyward =  new Book(
    '27',
    'Skyward',
    'Reach for the stars',
    '',
    skywardChapters,
    'Detritus',
    'Solar System',
    'The Nowhere',
    789)

export const wokChaptersFormat = `Ch.1: Stormblessed; Ch.2: Honorspren; Ch.3: City of Bells; 
Ch.4: The Shattered Plains; Ch.5: Heretic; Ch.6: Bridge Four; Ch.7: Anything Reasonable; Ch.8: 
Nearer the Flame; Ch.9: Damnation; Ch.10: Stories of Surgeons`
export const emptyRafoRepo = new BookRepo();
export const testRafoRepo = new BookRepo();
testRafoRepo.useDummyData()

export const emptyRafoServ = new BookServ(emptyRafoRepo)
export const testRafoServ = new BookServ(testRafoRepo)

export const emptyRafoRepo2 = new BookRepo();
export const emptyRafoServ2 = new BookServ(emptyRafoRepo2)