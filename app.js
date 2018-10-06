//book constructor
  function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
//UI constructor
  function UI(){}

UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  //create element tr
  const row = document.createElement('tr');
  //insert columns
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href ="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}
//show alert
UI.prototype.showAlert = function(message, className){
  //create div
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

//delete book
UI.prototype.deleteBook = function(target){
  if (target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}


UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//event listeners
  document.getElementById('book-form').addEventListener('submit',
  function(e){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //instantiate book
    const book = new Book(title, author, isbn);

    //instance of UI object
    const ui = new UI();

    //validate

    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'error');
    }else{

      ui.addBookToList(book);

      //show success
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
