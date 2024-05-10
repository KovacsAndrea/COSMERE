// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
export const filterDataID = new mongoDB.ObjectId("6632acbf6c6b27477e433728");
export const currentFilterID = new mongoDB.ObjectId("6632b3f2ab6702d69f7d0ca3");
export const currentSortID = new mongoDB.ObjectId("663349eab797ef97c5287305");
export const paginationDataID = new mongoDB.ObjectId("66335df6db215ae9f09a1359")
// Global Variables
export const collections: { books?: mongoDB.Collection, 
    editedBooks?: mongoDB.Collection
    filterCriteria?: mongoDB.Collection,
    sortCriteria?: mongoDB.Collection,
    paginationCriteria?: mongoDB.Collection} = {}
const DB_CONN_STRING="mongodb+srv://student:OFADKBux251jROqK@cosmere.0ntvhdb.mongodb.net/?retryWrites=true&w=majority&appName=COSMERE"
const COSMERE_DB ="COSMERE_DB"
const COSMERE_BOOK_COLLECTION = "COSMERE_BOOK_COLLECTION"
const COSMERE_EDITED_BOOKS = "COSMERE_EDITED_BOOKS"
const COSMERE_FILTER_CRITERIA = "COSMERE_FILTER_CRITERIA"
const COSMERE_SORT_CRITERIA = "COSMERE_SORT_CRITERIA"
const COSMERE_PAGINATION_CRITERIA = "COSMERE_PAGINATION_CRITERIA"
// Initialize Connection
dotenv.config({ path: '.env.cosmere' });
export async function connectToDatabase () {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING);
            
    await client.connect();
        
    const cosmere_db: mongoDB.Db = client.db(COSMERE_DB);

    const bookCollection: mongoDB.Collection = cosmere_db.collection(COSMERE_BOOK_COLLECTION);
    const editedBookCollection: mongoDB.Collection = cosmere_db.collection(COSMERE_EDITED_BOOKS);
    const filterCriteriaCollection: mongoDB.Collection = cosmere_db.collection(COSMERE_FILTER_CRITERIA);
    const sortCriteriaCollection: mongoDB.Collection = cosmere_db.collection(COSMERE_SORT_CRITERIA);
    const paginationCriteriaColection: mongoDB.Collection = cosmere_db.collection(COSMERE_PAGINATION_CRITERIA)

    collections.books = bookCollection;
    collections.editedBooks = editedBookCollection;
    collections.filterCriteria = filterCriteriaCollection;
    collections.sortCriteria = sortCriteriaCollection;
    collections.paginationCriteria = paginationCriteriaColection

    console.log(`Successfully connected to database: ${cosmere_db.databaseName} and collections: 
    ${bookCollection.collectionName}, 
    ${editedBookCollection.collectionName}, 
    ${filterCriteriaCollection.collectionName},
    ${sortCriteriaCollection.collectionName},
    ${paginationCriteriaColection.collectionName}`);
}

