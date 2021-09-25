let myLibrary = [];

// Book object
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const lotr = new Book("Lord of the rings", "JRR Tolkein", "892", false)



// Add book to library
const addBookButton = document.querySelector('.add-book');
addBookButton.addEventListener('click', displayForm);
const addBookFormRule = getAddBookFormRule();

function displayForm() {
    addBookFormRule.style.display = "initial";
}

function submitNewBook() {
    let newBook = new Book;

    for (const key in newBook) {
        if (newBook.hasOwnProperty.call(newBook, key)) {
            if (key == "read") {
                newBook[key] = document.getElementById(key).checked;
            } else {
                newBook[key] = document.getElementById(key).value;
            }
        }
    }
    myLibrary.push(newBook);
    addBookFormRule.style.display = "none";
    resetForm();
    createBookCard(newBook);

}

function getAddBookFormRule() {
    const ruleList = document.styleSheets[0].cssRules;
    let addBookFormRule;

    for (let i = 0; i < ruleList.length; i++) {
        if (ruleList[i].selectorText == ".add-book-form") {
            addBookFormRule = ruleList[i];
        }
    }
    return addBookFormRule;
}

function resetForm() {
    const formElemente = document.querySelectorAll('input');
    for (let i = 0; i < formElemente.length; i++) {
        formElemente[i].value = "";
    }
}

// Add book card
const booksContainer = document.querySelector('.books');

function createBookCard(book) {
    const newBook = document.createElement('div');
    newBook.classList.add('book');
    newBook.id = book.title;

    for (const key in book) {
        if (Object.hasOwnProperty.call(book, key)) {
            if (key == "title") {
                const bookTitle = document.createElement('h3');
                bookTitle.textContent = book.title;
                newBook.appendChild(bookTitle);
            } else if (key == "author") {
                const author = document.createElement('p');
                author.textContent = `Author: ${book.author}`;
                newBook.appendChild(author);
            } else if (key == "pages") {
                const pages = document.createElement('p');
                pages.textContent = `${book.pages} pages`;
                newBook.appendChild(pages);
            } else {
                const read = document.createElement('button');
                read.textContent = book[key] ? "Have read it" : "Have not read it";
                read.classList.add('read-button');
                read.addEventListener('click', toggleRead);
                newBook.appendChild(read);
            }
        }
    }

    const removeButton = document.createElement('button');
    removeButton.addEventListener('click', removeBook);
    removeButton.classList.add('remove-button');
    removeButton.textContent = "remove";
    newBook.appendChild(removeButton);

    booksContainer.appendChild(newBook);
}

// Remove book
function removeBook(e) {
    const bookDiv = e.target.parentNode;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title == bookDiv.id) {
            myLibrary.splice(i, 1);
        }
    }
    bookDiv.remove();
}

function toggleRead(e) {
    const bookDiv = e.target.parentNode;
    const readButton = bookDiv.querySelector('.read-button');

    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title == bookDiv.id) {
            myLibrary[i].read = !myLibrary[i].read;
            readButton.textContent = myLibrary[i].read ? "Have read it" : "Have not read it";
        }
    }

}