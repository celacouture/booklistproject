class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
class UI {
  addBookToList(book){
    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    //insert columns
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>`;

    list.appendChild(row);
  }

  showAlert(message, className){

    const div = document.createElement('div');
    //addClass
    div.className=`alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    //get form
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);

    //set time out
    setTimeout(function(){
      document.querySelector('.alert')
      .remove();
    }, 3000);
  }

  deleteBook(target){
    if(target.className==='delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

  }
}

//local storage class
class Store{
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books=[];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI;

      ui.addBookToList(book);
    })
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(){
    const books = Store.getBooks();

    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1)
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}
//dom load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);
//event listener for add Book

document.getElementById('book-form').addEventListener('submit', function(e){
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value

  //new instance of book
  const book = new Book(title, author, isbn);

  // new instance of UI
  const ui = new UI();
  //validate
  if(title === '' || author === '' || isbn === ''){
    ui.showAlert('Please fill in all fields', 'error')
  } else {
    ui.addBookToList(book);
    Store.addBook(book);
    ui.showAlert('Book Added!', 'success');
    ui.clearFields();
  }
  e.preventDefault();
})




//event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('Book removed!', 'success');
  e.preventDefault();
})
