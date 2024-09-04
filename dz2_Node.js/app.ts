// для изменения цветы вывода в консоль
let makeYellow = '\x1b[33m%s\x1b[0m';
let makeRed = '\x1b[31m%s\x1b[0m';
let makeGreen = '\x1b[32m%s\x1b[0m';

interface IBook {
    title: string;
    author: string;
    publishedYear: number;
    genre: string;
    isAvailable: boolean;
}

class Book implements IBook {
   
    constructor(public title: string, public author: string, public publishedYear: number,
        public genre: string, public isAvailable: boolean) { };
  
    // метод, который изменяет статус доступности книги на "не доступна"
    borrowBook(): void {
        this.isAvailable = false;
    }

    // метод, который изменяет статус доступности книги на "доступна"
    returnBook(): void {
        this.isAvailable = true;
    }

    showBook(): void {
        console.log(makeGreen,`
        --------Book--------
        Title: ${this.title}
        Author: ${this.author}
        Published Year: ${this.publishedYear}
        Genre: ${this.genre}
        Is available: ${this.isAvailable}
        --------------------`);
    }
}

interface IUser {
    id: number;
    name: string;
    // массив книг, которые взял пользователь
    borrowedBooks: Book[]
}

let userId = 0;

class User implements IUser {
    constructor(public id: number, public name: string, public borrowedBooks: Book[] = []) { }

    // метод, добавляет книгу в массив borrowedBooks и изменяет статус книги на "не доступна"
    borrow(book: Book): void {
        if (book.isAvailable == false) {
            console.log(makeRed, "This book is not available.")
            this.return;
        }
        else {
            this.borrowedBooks.push(book);
            book.borrowBook();
        }       
    }

    // метод, удаляет книгу из массива borrowedBooks и изменяет статус книги на "доступна"
    return(book: Book): void {
        for (let i = 0; i < this.borrowedBooks.length; i++) {
            if (this.borrowedBooks[i] == book) {
                this.borrowedBooks.splice(i, 1)
            }
        }
        book.returnBook();
    }

    showUserBook(): void{
        console.log(makeYellow, `User books:`)
        for (let i in this.borrowedBooks) {
            this.borrowedBooks[i].showBook();
        }
        console.log(makeYellow,` --------------------`)
    }

    showUser(): void {
        console.log(makeYellow,`
        --------User--------
        Id: ${this.id}
        Name: ${this.name}`);
        this.showUserBook();
    }
}

class Library {
    constructor(private books: Book[], private users: User[]) { }
  
    addBook(book:Book): void {
        this.books.push(book);
    }

    registerUser(user: User): void {
        this.users.push(user);
    }

    showAllBooks(): void {
        for (var i in this.books) {
            this.books[i].showBook();
        }
    }

    showAllUsers(): void {
        for (var i in this.users) {
            this.users[i].showUser();
        }
    }
}


///////////////////////////////////////////////////////////////////
let book1 = new Book("tit1", "auth1", 1985, "gen1", true);
let book2 = new Book("tit2", "auth2", 1999, "gen2", true);
let book3 = new Book("tit3", "auth3", 2004, "gen3", true);
let book4 = new Book("tit4", "auth4", 2011, "gen4", true);
let book5 = new Book("tit5", "auth5", 1986, "gen5", true);
let book6 = new Book("tit6", "auth6", 1985, "gen1", true);
let book7 = new Book("tit7", "auth7", 1994, "gen1", true);
let book8 = new Book("tit8", "auth8", 2005, "gen3", true);
let book9 = new Book("tit9", "auth9", 2012, "gen3", true);
let book10 = new Book("tit10", "auth10", 1987, "gen3", true);


let bookList: Book[] = [];
let userList: User[] = [];
let library = new Library(bookList, userList);

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
library.addBook(book4);
library.addBook(book5);
library.addBook(book6);
library.addBook(book7);
library.addBook(book8);
library.addBook(book9);
library.addBook(book10);

library.showAllBooks();

let user1 = new User(userId++, "user1");
let user2 = new User(userId++, "user2");
let user3 = new User(userId++, "user3");

library.registerUser(user1);
library.registerUser(user2);
library.registerUser(user3);

library.showAllUsers();

user1.borrow(book2);
user1.borrow(book3);
user3.borrow(book4);
user2.borrow(book4);

library.showAllBooks();
user1.showUser();
user2.showUser();
user3.showUser();

user1.return(book2);

library.showAllBooks();
user1.showUser();
user2.showUser();
user3.showUser();
