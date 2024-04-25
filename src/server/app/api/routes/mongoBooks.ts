import express from "express"
import { collections } from "../../../../database.service";
import { mongoBookServ, rafoRepo } from "../../data";

export const mongoBookRouter = express.Router();

mongoBookRouter.get("/message", async (_req, _res, _next) => {
    
    _res.status(200).json({
        message: "users"
    });
     } 
);

mongoBookRouter.get("/", async (_req, _res, _next) => {
    try{
        const books = await mongoBookServ.getAllBooks();
        _res.status(200).json({
            mesage: "trying to get books",
            books: books
        });
    } catch (error) {
        _res.status(500).json({
            error: error
        }
        );
     }
})

mongoBookRouter.get("/:ID", async (_req, _res, _next) => {
    const ID = _req.params.ID;
    try{
        const book = await mongoBookServ.getBookById(ID);
        _res.status(200).json({
            mesage: "trying to get books",
            book: book
        });
    } catch (error) {
        console.log()
        _res.status(400).json({ error: error });
     }
})

mongoBookRouter.post("/", async(_req, _res, _next) => {
    const book = {
        _title: _req.body._title,
        _description: _req.body._description,
        _planet: _req.body._planet,
        _system: _req.body._system,
        _shard: _req.body._shard,
        _startDate: _req.body._startDate
    };
    const transformedBook = { ...book, _id: undefined };
    
    try{
        const result = await collections.books?.insertOne(transformedBook);
        if (result) {
            console.log(`Successfully created a new book with id ${result.insertedId}`);
        } else {
            console.error("Failed to create a new book.");
        }
        _res.status(201).json({ message: "Successfully created all books." });
    } catch (error) {
        console.error(error);
        _res.status(400).json({ error: error });
    }
    
})

mongoBookRouter.get("/search/:SearchText", async(_req, _res, _next) => {
    const searchText = _req.params.SearchText;
    try{
        const books = await mongoBookServ.getBooksByName(searchText);
        _res.status(200).json({
            message: "Searching books",
            books: books
        })
    }
    catch (error) {
        console.log()
        _res.status(400).json({ error: error });
     }
})

mongoBookRouter.post("/localWrite", async (_req, _res, _next) => {
    try {
        if (!collections.books) {
            throw new Error("Collections.books is not initialized.");
        }
        const allBooks = rafoRepo.getAllBooks(); 
        for (const book of allBooks) {
            const transformedBook = { ...book, _id: book._id };
            const result = await collections.books.insertOne(transformedBook);
            if (result) {
                console.log(`Successfully created a new book with id ${result.insertedId}`);
            } else {
                console.error("Failed to create a new book.");
            }
        }
        _res.status(201).json({ message: "Successfully created all books." });
    } catch (error) {
        console.error(error);
        _res.status(400).json({ error: error });
    }
})

mongoBookRouter.delete("/deleteAll", async (_req, _res, _next) => {
    try {
        if (!collections.books) {
            throw new Error("Collections.books is not initialized.");
        }

        // Delete all documents from the collection
        const result = await collections.books.deleteMany({});

        // Check the result and send appropriate response
        if (result.deletedCount !== undefined && result.deletedCount > 0) {
            console.log(`Successfully deleted ${result.deletedCount} books.`);
            _res.status(200).json({ message: `Successfully deleted ${result.deletedCount} books.` });
        } else {
            console.error("Failed to delete books or no books found.");
            _res.status(404).json({ message: "No books found to delete." });
        }
    } catch (error) {
        console.error(error);
        _res.status(400).json({ error: error });
    }
})



