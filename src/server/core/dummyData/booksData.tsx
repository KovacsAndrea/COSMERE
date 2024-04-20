
import { Book } from '../model/book.tsx'
import { AJPEChapters, SSFHChapters, TSMChapters, WSIChapters, WSIIChapters, WSIIIChapters, bomChapters, dsChapters, edChapters, elChapters, lmChapters, obChapters, rowChapters, shChapters, soChapters, tEMChapters, tHoAChapters, tHoEChapters, tWoAChapters, teSChapters, tfeChapters, tressChapters, wbChapters, wokChapters, worChapters, yumiChapters } from './chaptersData.tsx'

export const dummyRafo: Book[] = [
    new Book(
        '1',
        'The Way of Kings',
        'The first book in The Stormlight Archive series',
        wokChapters,
        'Roshar',
        'Rosharan System',
        'Honor',
        2010),
    new Book(
        '2',
        'Words of Radiance',
        'The second book in The Stormlight Archive series',
        worChapters,
        'Roshar',
        'Rosharan System',
        'Honor',
        2014
    ),
    new Book(
        '3',
        'Oathbringer',
        'The third book in The Stormlight Archive series',
        obChapters,
        'Roshar',
        'Rosharan System',
        'Honor',
        2017
    ),
    new Book(
        '4',
        'Rhythm of War',
        'The fourth book in The Stormlight Archive series',
        rowChapters,
        'Roshar',
        'Rosharan System',
        'Honor',
        2020
    ),
    new Book(
        '5',
        'Edgedancer',
        'A novella in The Stormlight Archive series, focusing on Lift',
        edChapters,
        'Roshar',
        'Rosharan System',
        'Cultivation',
        2017
    ),
    new Book(
        '6',
        'Dawnshard',
        'A novella set in The Stormlight Archive series, focusing on Rysn',
        dsChapters,
        'Roshar',
        'Rosharan System',
        'Odium',
        2020
    ),
    new Book(
        '7',
        'Mistborn: The Final Empire',
        'The first book in the Mistborn series.',
        tfeChapters,
        'Scadrial',
        'Scadrian System',
        'Preservation',
        2006
    ),
    new Book(
        '8',
        'Mistborn: The Well of Ascension',
        'The second book in the Mistborn series.',
        tWoAChapters,
        'Scadrial',
        'Scadrian System',
        'Preservation',
        2007
    ),
    new Book(
        '9',
        'Mistborn: The Hero of Ages',
        'The third book in the Mistborn series.',
        tHoAChapters,
        'Scadrial',
        'Scadrian System',
        'Preservation',
        2008
    ),
    new Book(
        '10',
        'Mistborn: Secret History',
        'A companion novella to the Mistborn series, revealing hidden secrets.',
        shChapters,
        'Scadrial',
        'Scadrian System',
        'Harmony',
        2016
    ),
    new Book(
        '11',
        'Mistborn: Shadows of Self',
        'The fifth Mistborn book, set in the Wax and Wayne era.',
        soChapters,
        'Scadrial',
        'Scadrian System',
        'Harmony',
        2015
    ),
    new Book(
        '12',
        'Mistborn: Bands of Mourning',
        'The sixth Mistborn book, following Shadows of Self.',
        bomChapters,
        'Scadrial',
        'Scadrian System',
        'Harmony',
        2016
    ),
    new Book(
        '13',
        'Mistborn: The Lost Metal',
        'The forthcoming seventh Mistborn book, yet to be released.',
        lmChapters,
        'Scadrial',
        'Scadrian System',
        'Harmony',
        2022
    ),
    new Book(
        '14',
        'Yumi and the Nightmare Painter',
        'A standalone novel set in a unique fantasy world.',
        yumiChapters,
        'Komashi',
        'UTol system',
        'Virtuosity',
        2023
    ),
    new Book(
        '15',
        'Tress of the Emerals Sea',
        'A standalone novel set in a fantastical forest realm.',
        tressChapters,
        'Lumar',
        'Unknown System',
        'None',
        2023
    ),
    new Book(
        '16',
        'Warbreaker',
        'The funniest thing I read in my entire life',
        wbChapters,
        'Nalthis',
        'Nalthian System',
        'Endowment',
        2009
    ),
    new Book(
        '17',
        'Elantris',
        'The first ever novel. The start of it all. The one and the only. Elantris. To be continued in 2025 and 2027',
        elChapters,
        'Sel',
        'Selish System',
        'Devotion',
        2005
    ),
    new Book(
        '18',
        'The Hope of Elantris',
        'A short story set in the world of Elantris.',
        tHoEChapters,
        'Sel',
        'Selish System',
        'Devotion',
        2006
    ),
    new Book(
        '19',
        'The Emperor\'s Soul',
        'A novella set in the world of Sel, focusing on a skilled artificer who must create a new soul for the Emperor after an assassination attempt leaves him near death.',
        teSChapters,
        'Sel',
        'Selish System',
        'Devotion',
        2012
    ),
    new Book(
        '20',
        'The Eleventh Metal',
        'A Mistborn story revealing Kelsier\'s past and his discovery of the eleventh metal, which plays a crucial role in his plans to overthrow the Final Empire.',
        tEMChapters,
        'Scadrial',
        'Scadrian System',
        'Preservation',
        2011
    ),
    new Book(
        '21',
        'Allomancer Jak and the Pits of Eltania, Episodes 28 through 30',
        'A humorous serial following the adventures of the titular Allomancer Jak as he faces various challenges in the city of Elendel.',
        AJPEChapters,
        'Scadrial',
        'Scadrian System',
        'Preservation',
        2014
    ),
    new Book(
        '22',
        'White Sand I',
        'The graphic novel "White Sand" is set on the planet Taldain and following the adventures of a young sand master.',
        WSIChapters,
        'Taldain',
        'Taldain System',
        'Autonomy',
        2016
    ),
    new Book(
        '23',
        'White Sand II',
        'The graphic novel "White Sand" is set on the planet Taldain and following the adventures of a young sand master.',
        WSIIChapters,
        'Taldain',
        'Taldain System',
        'Autonomy',
        2018
    ),
    new Book(
        '24',
        'White Sand III',
        'The graphic novel "White Sand" is set on the planet Taldain and following the adventures of a young sand master.',
        WSIIIChapters,
        'Taldain',
        'Taldain System',
        'Autonomy',
        2019
    ),
    new Book(
        '25',
        'Shadows for Silence in the Forests of Hell',
        'A novella set in the world of Threnody, where Silence Montane runs a waystop in the deadly forests and must confront dangerous spirits to keep her business running.',
        SSFHChapters,
        'Threnody',
        'Threnodite System',
        'Ambition',
        2013
    ),
    new Book(
        '26',
        'The Sunlit Man',
        'A mysterious tale of a wanderer who discovers ancient secrets hidden within the depths of a sunlit realm.',
        TSMChapters,
        'Canticle',
        'Unknown System',
        'None',
        2023,
   )
]


