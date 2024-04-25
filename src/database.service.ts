// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
// Global Variables
export const collections: { books?: mongoDB.Collection} = {}
const DB_CONN_STRING="mongodb+srv://student:OFADKBux251jROqK@cosmere.0ntvhdb.mongodb.net/?retryWrites=true&w=majority&appName=COSMERE"
const COSMERE_DB ="COSMERE_DB"
const COSMERE_BOOK_COLLECTION = "COSMERE_BOOK_COLLECTION"
// Initialize Connection
dotenv.config({ path: '.env.cosmere' });
export async function connectToDatabase () {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING);
            
    await client.connect();
        
    const cosmere_db: mongoDB.Db = client.db(COSMERE_DB);

    const bookCollection: mongoDB.Collection = cosmere_db.collection(COSMERE_BOOK_COLLECTION);
    
    collections.books = bookCollection;
       
    console.log(`Successfully connected to database: ${cosmere_db.databaseName} and collection: ${bookCollection.collectionName}`);
}