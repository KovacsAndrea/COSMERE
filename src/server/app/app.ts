import express, {Request, Response, NextFunction} from "express"
import bookRouter from "./api/routes/bookRoutes";
import morgan from "morgan"
import bodyParser from "body-parser"
import CosmereError from "./api/cosmereError";
import { idGenerator } from "./api/routes/idGenerator";
import { filterData } from "./api/routes/filterData";
import { sortData } from "./api/routes/sortData";
import { chartData } from "./api/routes/chartData";
import { paginationData } from "./api/routes/paginationData";

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json())

app.use((_req, _res, _next) => {
    _res.header("Access-Control-Allow-Origin", "*");
    _res.header("Access-Control-Allow-Headers", "*");
    if (_req.method === 'OPTIONS') {
        _res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
        return _res.status(200).json({})
    }
    _next();
})

//routes which shouldd handle requests
app.use("/books", bookRouter)
app.use("/newId", idGenerator)
app.use("/filter", filterData)
app.use("/sort", sortData)
app.use("/chart", chartData)
app.use("/pagination", paginationData)

app.get('/ping', (_req, _res) => {
    _res.status(200).send('Server is up and running.');
  });

app.use((_req, _res, _next) => {
    const error = new CosmereError("Not Found");
    error.status = 404;
    _next(error);
})

app.use((_error: CosmereError, _req: Request, _res: Response, _next: NextFunction) => {
    _res.status(_error.status || 500);
    _res.json({
        _error: {
            message: _error.message
        }
    })
})
export default app;