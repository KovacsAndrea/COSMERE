
import { Book } from "../model/book.tsx";
import { generateRandomChapter, generateRandomDate, generateRandomDescription, generateRandomPlanet, generateRandomShard, generateRandomSystem, generateRandomTitle } from "../model/bookGenerator.tsx";
import { BookValidator } from "../model/bookValidator.tsx";
import { Chapter } from "../model/chapter.tsx";
import { IdGenerator } from "../model/idGenerator.tsx";
import { BookRepo } from "../repo/bookRepo.tsx";
import { DataRepo } from "../repo/dataRepo.tsx";
import { StatisticsRepo } from "../repo/statisticsRepo.tsx";
import { BookIServ } from "./bookIServ.tsx";

export class BookServ implements BookIServ{
    private rafoRepo: BookRepo;
    private dataRepo: DataRepo;
    private currentDataRepo: DataRepo;
    private elementsPerPage: number;
    private currentPage: number;
    private statisticsRepo: StatisticsRepo;
    private bookValidator: BookValidator;
    private idGenerator: IdGenerator;
    private sortCriteria;
    private sortDirection;
    private editedBookListLength;
    private intervalGeneration: NodeJS.Timeout | null;
    
    constructor(rafoRepo: BookRepo){
        this.rafoRepo = rafoRepo;
        this.dataRepo = new DataRepo();
        this.currentDataRepo = new DataRepo();
        this.elementsPerPage = 30;
        this.currentPage = 1;
        this.statisticsRepo = new StatisticsRepo();
        this.bookValidator = new BookValidator();
        this.idGenerator = new IdGenerator();
        this.sortCriteria = "Title";
        this.sortDirection = "Ascending";
        this.updateAddData();
        this. editedBookListLength = 0;
        //this.setupGenerating();
        this.intervalGeneration = null;
    }

    public setupGenerating(){
        const book = this.generateRandomBook();
        this.addBook(book)
        this.intervalGeneration = setInterval(() => {
            const book = this.generateRandomBook();
            this.addBook(book)
        }, 500);
    }

    public tearDownGeneration(){
        if(this.intervalGeneration)
        clearInterval(this.intervalGeneration)
    }


    public setElementsPerPage(elements: number){
        this.elementsPerPage = elements
    }

    public getElementsPerPage(){
        return this.elementsPerPage 
    }

    public getMaxPage(){
        return Math.ceil(this.editedBookListLength / this.elementsPerPage)
    }

    public getCurrentPage(){
        return this.currentPage
    }

    public setCurrentPage(page: number){
        this.currentPage = page;
    }
    

    public getBooksToJson(): Book[]{
        let books = this.rafoRepo.getAllBooks();
        return books;
    }

    public setSortCriteria(sortCriteria: string){
        this.sortCriteria = sortCriteria;
    }

    public setSortDirection(sortDirection: string){
        this.sortDirection = sortDirection;
    }

    public getSortCriteria(): string{
        return this.sortCriteria;
    }

    public getSortDirection(): string{
        return this.sortDirection;
    }

    public generateRandomBook(): Book{
        const id = this.getNewBookId();
        const title = generateRandomTitle();
        const description = generateRandomDescription();
        const chaptersList = []
        for(let i = 1; i<=10; i++){
            const chapter = new Chapter(i.toString(), id, i, generateRandomChapter(), generateRandomChapter(),10000, "Kal")
            chaptersList.push(chapter)
        }
        const planet = generateRandomPlanet();
        const system = generateRandomSystem();
        const shard = generateRandomShard();
        const date = generateRandomDate();
        const book = new Book(id, title, description, chaptersList, planet, system, shard, date);
        return book;
    }
    
    private getFilteredBooks(): Book[] {
        this.handleCheckedWasDeleted();
        let planets = this.currentDataRepo.getPlanets();
        let systems = this.currentDataRepo.getSystems();
        let shards = this.currentDataRepo.getShards();
        let dates = this.currentDataRepo.getDates();
        let result = this.rafoRepo.getAllBooks();
        if(!(planets.length === this.dataRepo.getPlanets().length ||
            planets.length === 0)){
                result = result.filter(book => planets.includes(book.planet));
            }
        if(!(systems.length === this.dataRepo.getSystems().length ||
            systems.length === 0)){
                result = result.filter(book => systems.includes(book.system));
            }
        if(!(shards.length === this.dataRepo.getShards().length ||
            shards.length === 0)){
                result = result.filter(book => shards.includes(book.shard));
            }
        if(!(dates.length === this.dataRepo.getDates().length ||
            dates.length === 0)){
                result = result.filter(book => dates.includes(book.startDate.toString()));
            }
        return result;
    }

    public sortBooks(): Book[]{
        let books = this.getFilteredBooks();
        if(this.sortDirection == "Ascending"){
            if(this.sortCriteria == "Title"){
                books.sort((book1, book2) => book1.title.localeCompare(book2.title))
            }
            if(this.sortCriteria == "Planets"){
                books.sort((book1, book2) => book1.planet.localeCompare(book2.planet))
            }
            if(this.sortCriteria == "Systems"){
                books.sort((book1, book2) => book1.system.localeCompare(book2.system))
            }
            if(this.sortCriteria == "Shards"){
                books.sort((book1, book2) => book1.shard.localeCompare(book2.shard))
            }
            if(this.sortCriteria == "Dates"){
                books.sort((book1, book2) => book1.startDate - book2.startDate)
                console.log("SORTAM TATI")
            }
        }

        if(this.sortDirection == "Descending"){
            if(this.sortCriteria == "Title"){
                books.sort((book1, book2) => book2.title.localeCompare(book1.title))
            }
            if(this.sortCriteria == "Planets"){
                books.sort((book1, book2) => book2.planet.localeCompare(book1.planet))
            }
            if(this.sortCriteria == "Systems"){
                books.sort((book1, book2) => book2.system.localeCompare(book1.system))
            }
            if(this.sortCriteria == "Shards"){
                books.sort((book1, book2) => book2.shard.localeCompare(book1.shard))
            }
            if(this.sortCriteria == "Dates"){
                books.sort((book1, book2) => book2.startDate - book1.startDate)
            }
        }
        return books
    }

    public getAllBooksNoPagination(): Book[] {
        if(
            (this.currentDataRepo.getPlanets().length === this.dataRepo.getPlanets().length ||
            this.currentDataRepo.getPlanets().length === 0) &&
            (this.currentDataRepo.getSystems().length === this.dataRepo.getSystems().length ||
            this.currentDataRepo.getSystems().length === 0) &&
            (this.currentDataRepo.getShards().length === this.dataRepo.getShards().length ||
            this.currentDataRepo.getShards().length === 0) &&
            (this.currentDataRepo.getDates().length === this.dataRepo.getDates().length
        || this.currentDataRepo.getDates().length === 0 )
        ){
            return this.rafoRepo.getAllBooks();
        }
        return this.getFilteredBooks();
    }

    public getAllBooks(): Book[] {
        console.log("Current Dates din repoOOOOOOOOOOOOOOOOOOOOoo" + this.currentDataRepo.getDates())
        if(
            (this.currentDataRepo.getPlanets().length === this.dataRepo.getPlanets().length ||
            this.currentDataRepo.getPlanets().length === 0) &&
            (this.currentDataRepo.getSystems().length === this.dataRepo.getSystems().length ||
            this.currentDataRepo.getSystems().length === 0) &&
            (this.currentDataRepo.getShards().length === this.dataRepo.getShards().length ||
            this.currentDataRepo.getShards().length === 0) &&
            (this.currentDataRepo.getDates().length === this.dataRepo.getDates().length
        || this.currentDataRepo.getDates().length === 0 )
        ){
            return this.rafoRepo.getAllBooks()
        }
        return this.getFilteredBooks()
    }

    public getPagesNumber(): number{
        let nrElements = this.getAllBooksNoPagination()
        let fullNumber = nrElements.length/this.elementsPerPage
        let flooredNr = Math.floor(nrElements.length/this.elementsPerPage)
        if(fullNumber == flooredNr){
            return fullNumber
        }
        return flooredNr + 1;
    }

    public getCurrentPageNumber(paginationNumber: number): number{
        let availableElements = this.getAllBooksNoPagination().length
        let currentPage = paginationNumber/this.elementsPerPage
        if(availableElements < paginationNumber){
            currentPage = availableElements/this.elementsPerPage
        }
        let flooredNr = Math.floor(currentPage)
        if(flooredNr == currentPage){
            return currentPage
        }
        return flooredNr + 1;
    }

    public useDummyData(): void {
        this.rafoRepo.useDummyData();
    }

    public getBookById(id: string): Book | undefined {
        return this.rafoRepo.getBookById(id);
    }

    public getBooksByTitle(searchText: string): Book[] {
        let books = this.sortBooks()
        
        if(searchText == "NONE"){ 
            this.editedBookListLength = books.length;
            return books.slice(this.elementsPerPage * (this.currentPage-1), 
            this.elementsPerPage * this.currentPage); 
        }
        else{

        let filteredBooks = books.filter(book => book.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
        this.editedBookListLength = filteredBooks.length;
        return filteredBooks.slice(this.elementsPerPage * (this.currentPage-1), 
        this.elementsPerPage * this.currentPage);
        }
    }

    public getMockBook(id: string): Book {
        return this.rafoRepo.getMockBook(id);
    }

    public isValidIdForNewBook(id: string){
        return this.bookValidator.isValidIdForNewBook(id, this.getListofIds())
    }

    public addBook(book: Book): void {
        if(this.isValidNewBook(book)){
            this.rafoRepo.addBook(book);
        }
        this.updateAddData();
    }

    public updateBook(book: Book): void {
        this.rafoRepo.updateBook(book);
        this.updateDeleteData();
        this.updateAddData();
    }

    public handleCheckedWasDeleted(): void{
        let planets = this.dataRepo.getPlanets();
        let currentPlanets = this.currentDataRepo.getPlanets();

        let systems = this.dataRepo.getSystems();
        let currentSystems = this.currentDataRepo.getSystems();

        let currentShards = this.currentDataRepo.getShards();
        let shards = this.dataRepo.getShards();

        let dates = this.dataRepo.getDates();
        let currentDates = this.currentDataRepo.getDates();

        for (var shard of currentShards){
            if( ! shards.includes(shard) ){this.currentDataRepo.deleteShard(shard)}
        }
        for (const planet of currentPlanets) {
            if (!planets.includes(planet)) {this.currentDataRepo.deletePlanet(planet);}
        }
        
        for (const system of currentSystems) {
            if (!systems.includes(system)) {this.currentDataRepo.deleteSystem(system);}
        }
        
        for (const date of currentDates) {
            if (!dates.includes(date)) {this.currentDataRepo.deleteDate(date);}
        }
    }

    public deleteBook(id: string): void {
        this.rafoRepo.deleteBook(id);
        this.updateDeleteData();
    }

    public getNewBookId(): string {
        return this.idGenerator.getNewBookId(this.rafoRepo.getAllBooks())
    }

    public getListofIds(): string[] {
        return this.rafoRepo.getAllBooks().map(book => book.id)
    }

    public isValidNewBook(book: Book): boolean {
        return this.bookValidator.isValidNewBook(book, this.getListofIds())
    }

    public containsBook(id: string): boolean {
        return this.rafoRepo.containsBook(id);
    }

    public length(): number {
        return this.rafoRepo.length();
    }

    public updateAddData(): void {
        let planets = [...new Set(this.rafoRepo.getAllBooks().map(book => book.planet))];
        let systems = [...new Set(this.rafoRepo.getAllBooks().map(book => book.system))];
        let shards = [...new Set(this.rafoRepo.getAllBooks().map(book => book.shard))];
        let startDates = [...new Set(this.rafoRepo.getAllBooks().map(book => book.startDate))];
        planets.forEach(planet => {
            if (!this.dataRepo.getPlanets().includes(planet)) {
                this.dataRepo.addPlanet(planet);
            }
        });
        systems.forEach(system => {
            if (!this.dataRepo.getSystems().includes(system)) {
                this.dataRepo.addSystem(system);
            }
        });
    
        shards.forEach(shard => {
            if (!this.dataRepo.getShards().includes(shard)) {
                this.dataRepo.addShard(shard);
            }
        });
    
        startDates.forEach(startDate => {
            if (!this.dataRepo.getDates().includes(startDate.toString())) {
                this.dataRepo.addDate(startDate.toString());
            }
        });
    }

    public updateDeleteData(): void {
        let planets = [...new Set(this.rafoRepo.getAllBooks().map(book => book.planet))];
        let systems = [...new Set(this.rafoRepo.getAllBooks().map(book => book.system))];
        let shards = [...new Set(this.rafoRepo.getAllBooks().map(book => book.shard))];
        let startDates = [...new Set(this.rafoRepo.getAllBooks().map(book => book.startDate))];
        this.dataRepo.getPlanets().forEach(planet => {
            if (!planets.includes(planet)) {
                this.dataRepo.deletePlanet(planet);
            }
        });
        
        this.dataRepo.getSystems().forEach(system => {
            if (!systems.includes(system)) {
                this.dataRepo.deleteSystem(system);
            }
        });
    
        this.dataRepo.getShards().forEach(shard => {
            if (!shards.includes(shard)) {
                this.dataRepo.deleteShard(shard);
            }
        });
    
        this.dataRepo.getDates().forEach(date => {
            if (!startDates.includes(parseInt(date))) {
                this.dataRepo.deleteDate(date);
            }
        });
    }

    public setCurrentPlanetData(planets: string[]){
        this.currentDataRepo.setPlanets(planets);
    }

    public setCurrentSystemData(systems: string[]): void {
        this.currentDataRepo.setSystems(systems);
    }
    
    public setCurrentShardData(shards: string[]): void {
        this.currentDataRepo.setShards(shards);
    }
    
    public setCurrentDateData(dates: string[]): void {
        this.currentDataRepo.setDates(dates);
    }

    public getCurrentPlanetData(): string[] {
        return this.currentDataRepo.getPlanets();
    }
    
    public getCurrentSystemData(): string[] {
        return this.currentDataRepo.getSystems();
    }
    
    public getCurrentShardData(): string[] {
        return this.currentDataRepo.getShards();
    }
    
    public getCurrentDateData(): string[] {
        return this.currentDataRepo.getDates();
    }


    public getDataRepo(): DataRepo {
        return this.dataRepo;
    }

    public getPlanetData(){
        return this.dataRepo.getPlanets()
    }

    public getSystemData() {
        return this.dataRepo.getSystems()
    }

    public getShardData() {
        return this.dataRepo.getShards()
    }

    public getDateData() {
        return this.dataRepo.getDates()
    }

    public getChartDataForPlanets() {
        return this.statisticsRepo.getChartDataforPlanets(this.rafoRepo.getAllBooks());
    }

    public getChartDataForSystems() {
        return this.statisticsRepo.getChartDataForSystems(this.rafoRepo.getAllBooks());
    }
    
    public getChartDataForShards() {
        return this.statisticsRepo.getChartDataForShards(this.rafoRepo.getAllBooks());
    }
    
    public getChartDataForDates() {
        return this.statisticsRepo.getChartDataForDates(this.rafoRepo.getAllBooks());
    }

}