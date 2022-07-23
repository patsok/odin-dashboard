let myLibrary = [];

class Book {
    constructor(title, author, read) {
        this.title = title;
        this.author = author;
        this.read = read;
        this.id = this.setId();
        this.date = this.setDate();
        this.addToLibrary();
    }

    //set time signature for new books
    setDate() {
        return new Date();
    }

    //setting unique id for new book
    setId() {
        return myLibrary.length + 1;
    }

    //adding to library
    addToLibrary() {
        myLibrary.push(this);
    }
}

//setup of library objects
let lotr = new Book('Lord of the Rings', 'J.R.R. Tolkien', false);
let witcher = new Book('The Witcher', 'Andrzej Sapkowski', true);
let fma = new Book('Fullmetal Alchemist', 'Hiromu Arakawa', true);

const displayController = (() => {
    //reload table every time book is added, deleted or edited
    const fillValues = () => {
        let table = document.querySelector('tbody');
        table.innerHTML = "";
        let row = 0;
        myLibrary.forEach(book => {
            let tr = document.createElement('tr');
            row++;
            let i = 0;
            for (let key in book) {
                i++
                if (i < 5) {
                    let td = document.createElement('td');
                    if (key == 'read') {
                        if (book[key] == true) {
                            // textHTML = `<input type="checkbox" checked disabled>`;
                            td.textContent = 'Yes';
                        } else {
                            // textHTML = `<input type="checkbox" disabled>`;
                            td.textContent = 'No';
                        }
                        // td.insertAdjacentHTML('beforeend', textHTML);
                    } else if (i !== 4) {
                        td.textContent = book[key];
                    } else {
                        let textHTML = `<img src="img/edit.svg" alt="edit row" class="filter edit row-${row} id-${book.id}" width="20px">
                        <img src="img/confirm.svg" alt="confirm row" class="filter confirm row-${row} id-${book.id}" width="20px" style="display:none">
                        <img src="img/delete.svg" alt="delete row" class="filter delete row-${row} id-${book.id}" width="20px">`
                        td.insertAdjacentHTML('beforeend', textHTML);
                    }
                    tr.appendChild(td);
                }
            };

            table.appendChild(tr);
        });
        setActions();
    }

    //build listeners to newly added buttons for actions
    const setActions = () => {
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', () => libraryController.deleteEntry(button));
        });
        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', () => {
                libraryController.editEntry(button);
                button.setAttribute('style', 'display:none;');
                button.parentNode.querySelector('img:nth-child(2)').setAttribute('style', 'display:inline-block');
            });
        });
        document.querySelectorAll('.confirm').forEach(button => {
            button.addEventListener('click', () => libraryController.confirmEntry(button));
        })
    }

    fillValues();

    //dark-mode toggle
    document.querySelector('.mode').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    })
    return { fillValues }
})()

const libraryController = (() => {
    //preventing submitting data
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        libraryController.addEntry();
        form.reset();
    })

    //adding new book to library
    function addEntry() {
        let title = capitalize(document.querySelector('#book-title').value);
        let author = capitalize(document.querySelector('#book-author').value);
        let read = document.querySelector('#book-read').checked;
        new Book(title, author, read);
        displayController.fillValues();
    }

    //capitalize string by slicing
    let capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    //deletes book from library by splicing id
    function deleteEntry(button) {
        const id = button.classList[3].replace('id-', '')
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id == id) {
                myLibrary.splice(i, 1);
                displayController.fillValues();
            }
        }
    }

    //change text to inputs for user interaction
    function editEntry(button) {
        row = button.classList[2].replace('row-', '');
        let tds = document.querySelectorAll(`tbody>tr:nth-child(${row}) td`);
        tds.forEach((el, i) => {
            if (i < 2) {
                el.innerHTML = `<input type='text' value='${el.textContent}'>`;
            } else if (i == 2) {
                const temporaryValue = el.childNodes[0].textContent;
                el.childNodes[0].textContent = '';
                if (temporaryValue == "Yes") {
                    textHTML = `<input type="checkbox" checked>`;
                } else {
                    textHTML = `<input type="checkbox">`;
                }
                el.insertAdjacentHTML('beforeend', textHTML);
            }
        });
    };

    //edits book from library by changing book values
    function confirmEntry(button) {
        row = button.classList[2].replace('row-', '')
        id = button.classList[3].replace('id-', '')
        let tds = document.querySelectorAll(`tbody>tr:nth-child(${row}) td`);
        tds.forEach((el, i) => {
            if (i == 0) {
                myLibrary[row - 1].title = el.childNodes[0].value;
            } else if (i == 1) {
                myLibrary[row - 1].author = el.childNodes[0].value;
            } else if (i == 2) {
                myLibrary[row - 1].read = el.childNodes[1].checked;
            }
        })
        displayController.fillValues();
    }
    return { deleteEntry, editEntry, confirmEntry, addEntry }
})()