// Associating divs in HTML with JS
const library = document.querySelector('#library');
const body = document.querySelector('#body');
const bookForm = document.querySelector('#newBook');
const welcome = document.querySelector('#welcome');
const buttons = document.querySelector('#buttons');
const populated = document.querySelector('#populated');
const welcomeBtns = document.createElement('div');
const menu = document.querySelector('#menu');
const title = document.querySelector('#title');
const add = document.querySelector('#add');

test
welcomeBtns.classList.add('welcomeBtns');
populated.classList.add('populated');

// An array to store each card
let myLibrary = [];


// Personalize button
const personalizeBtn = document.createElement('button');
personalizeBtn.classList.add('hidden');
buttons.appendChild(personalizeBtn);

// Add book button
const addBookBtn = document.createElement('button');
buttons.appendChild(addBookBtn);



buttons.appendChild(welcomeBtns);
welcomeBtns.appendChild(personalizeBtn);
welcomeBtns.appendChild(addBookBtn);
populated.appendChild(menu);
populated.appendChild(title);
populated.appendChild(add);

// Form hidden/visible
bookForm.classList.toggle('formHidden');
addBookBtn.addEventListener('click', () => bookForm.classList.toggle('formOpen'));
// Hiding form after submission is in addBooktoLibrary() function
add.addEventListener('click', () => bookForm.classList.toggle('formOpen'));


// Stored books auto-populate + show Welcome if no books are in storage + toggle buttons on load
if(localStorage.getItem('library')) {
	myLibrary = JSON.parse(localStorage.getItem('library'));
	render();
} else {
	welcome.classList.remove('hidden');
	welcomeButtons();
}


// Create books with FACTORY FUNCTION
function createBook(title, author, pages, read, index, color) {
	//var book = Object.create(createBook.prototype); // This doens't seem necesary. Why was it here and what should it do?
	return {title, author, pages, read, index, color};
}


// Create a book from the form, add it to myLibrary array and localStorage
function addBooktoLibrary() {
	
	// Collect data from form
	let author = document.querySelector('#fauthor').value;
	let title = document.querySelector('#ftitle').value;
	let pages = document.querySelector('#fpages').value;
	let read = document.querySelector('#fread').checked;
	
	// Find index number through myLibrary array
	let index = myLibrary.length;
	
	// Assign random color
	let color = randomColor();
	
	// Create Book object 
	let book = createBook(title, author, pages, read, index, color);
	
	// Add book to myLibrary
	myLibrary.push(book);
	populateStorage();	
	
	// Hide form
	bookForm.classList.remove('formOpen');
	
	
	//CLEAR FORM
		// MODIFY: create a class for all, iterate through the class clearing text/value in for loop.
	document.querySelector('#fauthor').value = '';
	document.querySelector('#ftitle').value = '';
	document.querySelector('#fpages').value = '';
	document.querySelector('#fread').value = '';
	
	// Populate cards
	
	render();
	
}


// Display books on screen
function render() {
	// Toggle welcome and display buttons
	if (myLibrary.length > 0) { 
		welcome.classList.remove('unhidden');
		welcome.classList.add('hidden');	
		populatedButtons();
	} else {
		welcome.classList.toggle('hidden');
		welcomeButtons();
	}
	
	// Remove exisiting nodes from the display
	while (library.hasChildNodes()){
		library.removeChild(library.lastChild);
	} 
	
	let card, newTitle, newAuthor, newPages, readBtn, delBook;
	
	
	// Display each book in myLibrary
	myLibrary.forEach( (book) => {
		card = document.createElement('div');
		newTitle = document.createElement('h1');
		newAuthor = document.createElement('p');
		newPages = document.createElement('p');
		newBtnDiv = document.createElement('div');
		readBtn = document.createElement('button');
		readBtn.addEventListener('click', function () {
			if (book.read == 1) {
				book.read = 0;
				render();
				return;
			}
			book.read = 1;
			render();
			// Is calling render the cleanest, simplist way to do this? It seems overkill to remove and add again all books.
			// I'd like to get this to reference a toggle funciton in the Book creator funciton...is this posible with factory (vs constructor?) - see TOP instructions 6.1
		})
		delBook = document.createElement('button');
		delBook.addEventListener('click', function () {
			if (confirm(`Do you want to delete ` + book.title + ` from your library?`)) {
				if (myLibrary.length <= 1) {
					myLibrary = [];
					localStorage.clear();
					welcome.classList.add('unhidden');
				} else {
					let idx = book.index
					myLibrary.splice(idx, 1);
					welcome.classList.add('hidden');
					myLibrary.forEach((book) => {
						if (book.index > idx) {
							book.index--;
						}
					})
				}			
				render();
			}
		});
		populateStorage();
		library.appendChild(card);
		card.appendChild(newTitle);
		card.appendChild(newAuthor);
		card.appendChild(newPages);
		card.appendChild(newBtnDiv);
		newBtnDiv.appendChild(readBtn);
		newBtnDiv.appendChild(delBook);
		card.style.backgroundColor = book.color;
		card.className = 'book';
		newBtnDiv.className = 'cardButtons';
		newTitle.textContent = book.title;
		newAuthor.textContent = `by ${book.author}`;
		newPages.textContent = `${book.pages} pages`;
		if (book.read) {
			readBtn.textContent = 'Read';
			readBtn.className = 'read';
		}else {
			readBtn.textContent = 'Not Read';
			readBtn.className = 'notRead';
		}
		delBook.textContent = 'Delete';
		delBook.className = 'delete';		
	});
}

function populateStorage() {
	localStorage.setItem('library', JSON.stringify(myLibrary));
}

function displayStorage() {
	console.log(localStorage.getItem('library'));
}

function randomColor() {
	let random = Math.floor(Math.random() * 5) + 5;
	let prefix = '--color';
	let number;
	switch (random) {
		case 5:
			number = '5';
			break;
		case 6:
			number = '6';
			break;
		case 7:
			number = '7';
			break;
		case 8:
			number = '8';
			break;
		case 9:
			number = '9';
			break;
	}
	let variable = prefix.concat(number);
	return getComputedStyle(body).getPropertyValue(variable);
}




function populatedButtons() {
	welcomeBtns.classList.add('hidden');
	populated.classList.remove('hidden');
	title.textContent = 'My Library';
}

function welcomeButtons() {
	welcomeBtns.classList.remove('hidden');
	populated.classList.add('hidden');
	addBookBtn.textContent = 'Add a Book';
	personalizeBtn.textContent = 'Personalize';
	
}



/*function personalize() {
	form = can enter:
		name
		color schemes
			options
			or self-designed
				11 color options
	store info in local storage under new array - 
		have CSS call the colors from this storage
	name gets put to 'my library'
}*/

//localStorage.clear();

// Toggle READ

function menuChange(x) {
	x.classList.toggle('change');
}



//========NOTES========\\
/*
	- Responsive
		- One book on mobile
		- More as screen gets bigger
	- List of all books (collapsed)
	- Personalization
		- colors
		- Name
		- sort books by
			- title
			- author
			- when added
			- number of pages
			
	- Menu
		- opens to show
			- personalize
			- about
			- sort
	
	- Animations
		- after first book added
			- add book buttons (and others) move to the top and morph into new forms
	
	- Auto books
		- add a read file to populate random books into library if you want.
		- add button to start with random books
			- input number of books you want (maybe radio-buttons)
*/





/*///=====NOTES======\\\\*\
to call a HTML element in JS:
	$('element')
		e.g.: $('body').on('click', function...)
		https://m.youtube.com/watch?v=fjJoX9F_F5g
			minute 6
		/*/
		