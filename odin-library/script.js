//setup of library object and filling it with basic data 
let myLibrary = [];

function Book(title, author, read, id, date) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.id = id;
    this.date = date;
}

let lotr = new Book('Lord of the Rings', 'J.R.R. Tolkien', false, 1, setDate());
let witcher = new Book('The Witcher', 'Andrzej Sapkowski', true, 2, setDate());
let fma = new Book('Fullmetal Alchemist', 'Hiromu Arakawa', true, 3, setDate());
myLibrary.push(lotr, witcher, fma);

//to set time signature for new books
function setDate() {
    return new Date();
}

window.addEventListener('load', () => {
    fillValues();
})

//reload table every time book is added, deleted or edited
function fillValues() {
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
                        textHTML = `<input type="checkbox" checked disabled>`;
                    } else {
                        textHTML = `<input type="checkbox" disabled>`;
                    }
                    td.insertAdjacentHTML('beforeend', textHTML);
                } else if (i !== 4) {
                    td.textContent = book[key];
                } else {
                    let textHTML = `<img src="img/delete.svg" alt="delete row" class="filter delete row-${row} id-${book.id}" width="20px">
                    <img src="img/edit.svg" alt="edit row" class="filter edit row-${row} id-${book.id}" width="20px">
                    <img src="img/confirm.svg" alt="confirm row" class="filter confirm row-${row} id-${book.id}" width="20px" style="display:none">`
                    td.insertAdjacentHTML('beforeend', textHTML);
                }
                tr.appendChild(td);
            }
        };

        table.appendChild(tr);
    });
    setActions();
}

let form = document.querySelector('form');

//preventing submitting data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addEntry();
    fillValues();
})

//adding new book to library
function addEntry() {
    let title = document.querySelector('#book-title').value;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    let author = document.querySelector('#book-author').value;
    author = title.charAt(0).toUpperCase() + author.slice(1);
    let read = document.querySelector('#book-read').checked;
    let date = setDate();
    let id = setId();
    let newEntry = new Book(title, author, read, id, date);
    myLibrary.push(newEntry);
}

//setting unique id for new book
function setId() {
    return myLibrary.length + 1;
}

//build listeners to newly added buttons for actions
function setActions() {
    let deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => deleteEntry(button));
    });
    let editButtons = document.querySelectorAll('.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            editEntry(button);
            button.setAttribute('style', 'display:none;');
            button.parentNode.querySelector('img:last-of-type').setAttribute('style', 'display:inline-block');
        });

    });
    let confirmButtons = document.querySelectorAll('.confirm');
    confirmButtons.forEach(button => {
        button.addEventListener('click', () => confirmEntry(button));
    })
}

//deletes book from library by splicing id
function deleteEntry(button) {
    id = button.classList[3].replace('id-', '')
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == id) {
            myLibrary.splice(i, 1);
            fillValues();
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
            el.childNodes[0].removeAttribute('disabled');
        }
    });
};

//edits book from library by changing book values
function confirmEntry(button) {
    row = button.classList[2].replace('row-', '')
    id = button.classList[3].replace('id-', '')
    console.log(row, id);
    let tds = document.querySelectorAll(`tbody>tr:nth-child(${row}) td`);
    tds.forEach((el, i) => {
        if (i == 0) {
            myLibrary[row - 1].title = el.childNodes[0].value;
        } else if (i == 1) {
            myLibrary[row - 1].author = el.childNodes[0].value;
        } else if (i == 2) {
            myLibrary[row - 1].read = el.childNodes[0].checked;
        }
    })
    fillValues();
}


//dark-mode toggle
const toogleButton = document.querySelector('.mode');
toogleButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
})

//testing purposes
// document.querySelector('.test').addEventListener('click', () => {
//     console.table(myLibrary);
// })