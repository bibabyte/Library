


let myLibrary = [];



// Stored books auto-populate + show Welcome if no books are in storage + toggle buttons on load
if(localStorage.getItem('library')) {
	myLibrary = JSON.parse(localStorage.getItem('library'));
	render();
} else {
	bbtns.welcome.classList.remove('hidden');
	welcomeButtons();
}


	import { createBook, bbtns } from './modules-2/createBook.js';
	import { addBooktoLibrary, book } from './modules-2/addBooktoLibrary.js';
	import { clearForm } from './modules-2/clearForm.js'

// SUBMIT FORM - create an element for this and put it inside a module/function
document.querySelector('#submit').addEventListener('click', () => {
	addBooktoLibrary();
	clearForm();
} );
	

function toggleView() {
	if (myLibrary.length > 0) { 
		welcome.classList.remove('unhidden');
		welcome.classList.add('hidden');	
		populatedButtons();
	} else {
		welcome.classList.toggle('hidden');
		welcomeButtons();
	}
}

function clearNodes () {
	while (library.hasChildNodes()){
		library.removeChild(library.lastChild);
	} 	
}

/*function toggleBookRead(ele) {
	if (ele.read == 1) {
		ele.read = 0;
		render();
		return;
	}
	ele.read = 1;
	render();
	return;
}*/


function displayBook(book) {
	let card, newTitle, newAuthor, newPages, newBtnDiv,readBtn, delBook;
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
	});
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

	//	deleteBook());
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
}

// Display books on screen
function render() {
	// Toggle welcome and display buttons
	toggleView();
	
	// Remove exisiting nodes from the display
	clearNodes();
	
	// Display each book in myLibrary
	myLibrary.forEach( element => displayBook(element) ); 
}
		



function populateStorage() {
	localStorage.setItem('library', JSON.stringify(myLibrary));
}

function displayStorage() {
	console.log(localStorage.getItem('library'));
}

function randomColor() {
	const body = document.querySelector('body');
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
	bbtns.welcomeBtns.classList.add('hidden');
	bbtns.populated.classList.remove('hidden');
	title.textContent = 'My Library';
}

function welcomeButtons() {
	bbtns.welcomeBtns.classList.remove('hidden');
	bbtns.populated.classList.add('hidden');
	bbtns.addBookBtn.textContent = 'Add a Book';
	bbtns.personalizeBtn.textContent = 'Personalize';
	
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

	export { myLibrary, randomColor, populateStorage, render }