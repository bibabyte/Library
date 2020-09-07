// Associating divs in HTML with JS
const library = document.querySelector('#library');
const body = document.querySelector('#body');
const bookForm = document.querySelector('#newBook');

// An array to store each card
let myLibrary = [];



// Add book button
const addBookBtn = document.createElement('button');
addBookBtn.className = 'button';
addBookBtn.textContent = 'Add a Book';
body.appendChild(addBookBtn);


// Form hidden/visible
bookForm.classList.toggle('formHidden');
addBookBtn.addEventListener('click', () => bookForm.classList.toggle('formOpen'));
// Hiding form after submission is in addBooktoLibrary() function




//=========TESTING=========\\
let prince = createBook('The Little Prince', 'Antoine de Saint-Exupery', 37, 0, 0);

let gatsby = createBook('The Great Gatsby', 'F. Scott Fitzgerald', 197, 1, 1);
myLibrary.push(prince, gatsby)
//=========================\\



// Book constructor and prototype funcitons
/*function Book(title, author, pages, read, index){
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.dataIndex = index;
}*/

// Book.prototype.toggleRead = function() {
// 	let index = this.dataIndex;
// 	if (myLibrary[index].read) {
// 		myLibrary[index].read = 0;
// 	}else {
// 		myLibrary[index].read = 1;
// 	};
// 	render();
// }

/*Book.prototype.about = function() {
	return (`${title} by ${author}, ${pages} pages, ${read}`);
}
*/
// FACTORY FUNCTION
function createBook(title, author, pages, read, index) {
	var book = Object.create(createBook.prototype);
	return {title, author, pages, read, index };
}

createBook.prototype.about = function () {
		return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
	}

	
// =====



// Create a book from the form, add it to myLibrary array
function addBooktoLibrary() {
	
	// Collect data from form
	let author = document.querySelector('#fauthor').value;
	let title = document.querySelector('#ftitle').value;
	let pages = document.querySelector('#fpages').value;
	let read = document.querySelector('#fread').checked;
	
	// Find index number through myLibrary array
	let index = myLibrary.length;
	
	// Create Book object - `new Book` uses CONSTRUCTOR - `createBook` uses FACTORY FUNCTION
//	let book = new Book(title, author, pages, read, index);
	let book = createBook(title, author, pages, read, index);
	
	// Add book to myLibrary
	myLibrary.push(book); 
	
	// Hide form
	bookForm.classList.remove('formOpen');
	
	//CLEAR FORM
	document.querySelector('#fauthor').value = '';
	document.querySelector('#ftitle').value = '';
	document.querySelector('#fpages').value = '';
	document.querySelector('#fread').value = '';
	render();
}


// Display books on screen
function render() {
	// Remove exisiting nodes from the display to allow a full repopulation below
	while (library.hasChildNodes()){
		library.removeChild(library.lastChild);
	}
	
	let card, newTitle, newAuthor, newPages, newRead, delBook;
	
	// Display each book in myLibrary
	//for (book of myLibrary) {
	myLibrary.forEach(function (book) {
			console.log(book.title + '...' + book.index);
		card = document.createElement('div');
		newTitle = document.createElement('h1');
		newAuthor = document.createElement('p');
		newPages = document.createElement('p');
		newRead = document.createElement('button');
		newRead.addEventListener('click', function () {
			if (book.read == 1) {
				book.read = 0;
				render();
				return;
			}
			book.read = 1;
			newRead.textContent = 'Read';
			render();
			// Is calling render the cleanest, simplist way to do this? It seems overkill to remove and add again all books.
		})
		delBook = document.createElement('button');
		delBook.addEventListener('click', function () {
			if (confirm(`Do you want to delete ` + book.title + ` from your library?`)) {
			myLibrary.splice(book.index, 1);
			// is there a need to change indexes so there's no numerical gap?
			render();
			}
		});
		library.appendChild(card);
		card.appendChild(newTitle);
		card.appendChild(newAuthor);
		card.appendChild(newPages);
		card.appendChild(newRead);
		card.appendChild(delBook);
		card.style.backgroundColor = randomColor();
		card.className = 'book';
		newTitle.textContent = book.title;
		newAuthor.textContent = `by ${book.author}`;
		newPages.textContent = `${book.pages} pages`;
		if (book.read) {
			newRead.textContent = 'Read';
		}else {
			newRead.textContent = 'Not Read';
		}
		delBook.textContent = 'Delete';
		
	});
	
	
}





function randomColor() {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return `rgb(${r},${g},${b})`;
}

// Stored books auto-populate
render();


// Toggle READ




//========NOTES========\\
/*
	deleteBook
		Currently
			code is deep in the render() function.
			The problem persists that the item deleted is the LAST item in the array.
			*card.remove is GREAT => don't have to remove and re-render all the cards!
			still unsure how to get the index of the current delete button.
				Maybe there's something in creating an iterator and adding an ID to each delete button as they're created?
				This would have to be the same for read...?
			need to get the display to confirm deletion up and runing too.
			
			WEIRDSHIT:
				card.remove removes LAST card
						(only seems to remove the one, another card won't be removed)
				while
				splice removes FIRST book.
			  Currently we're left with a ever shrinking array (item[0] gets removed)
			  	while item[-1] seems to be removed on the first iteration and NONE thereafter.
				This junk is messed up!
			  RENDER
			  	gives a more true view of what is being deleted
			  ALSO
				Objects keep their index even when another object is removed.
			
	toggle read
		in limbo
		
	


//*/
//button.addEventListener('click', listener, useCapture)

// function buttonClick() {
// 	if (button.getElementById == 'delBook') {
// 		deleteBook();
// 		return;
		
// 	}else if (button.getElementById == 'newRead') {
// 		toggleRead();
// 		return;
// 	}else if (button.getElementById == 'addBookBtn') {
// 		addBooktoLibrary();
// 		return
// 	}
// }





/*///=====NOTES======\\\\*\
to call a HTML element in JS:
	$('element')
		e.g.: $('body').on('click', function...)
		https://m.youtube.com/watch?v=fjJoX9F_F5g
			minute 6
		/*/
		