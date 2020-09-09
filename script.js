// Associating divs in HTML with JS
const library = document.querySelector('#library');
const body = document.querySelector('#body');
const bookForm = document.querySelector('#newBook');

// An array to store each card
let myLibrary = [];


//checkLocalStorage();

// Add book button
const addBookBtn = document.createElement('button');
addBookBtn.className = 'button';
addBookBtn.textContent = 'Add a Book';
body.appendChild(addBookBtn);


// Form hidden/visible
bookForm.classList.toggle('formHidden');
addBookBtn.addEventListener('click', () => bookForm.classList.toggle('formOpen'));
// Hiding form after submission is in addBooktoLibrary() function

//====== STORAGE =====\\

// Function to determine if storage is available (to use Local Storage)
// for information on this code see: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
	var storage;
	try {
		storage = window[type];
		var x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return e instanceof DOMException && (
		e.code === 22 ||
		e.code === 1014 ||
		e.name === 'QuotaExceedError' ||
		e.name === 'NS_ERROR_DOM_QUOTA_REACHED' ) &&
		(storage && storage.length !== 0);
	}
}

// Run test for local storage - log in console.
if (storageAvailable('localStorage')) {
//	console.log('Local Storage Available');
} else {
//	console.log('no local storage');
}

// More storage
if (localStorage.getItem('myLibrary')) {
	myLibrary.push('myLibrary');
} else {
//	console.log('nothing in storage yet');
}

// Populate Storage within render function



//=========TESTING=========\\
let prince = createBook('The Little Prince', 'Antoine de Saint-Exupery', 37, 0, 0);

let gatsby = createBook('The Great Gatsby', 'F. Scott Fitzgerald', 197, 1, 1);
myLibrary.push(prince, gatsby)
//=========================\\



// Book constructor and prototype funcitons
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
	
	// Create Book object 
	let book = createBook(title, author, pages, read, index);
	
	// Add book to myLibrary
	myLibrary.push(book); 
	
	// Hide form
	bookForm.classList.remove('formOpen');
	
	//CLEAR FORM
		// MODIFY: create a class for all, iterate through the class clearing text/value in for loop.
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
	
	let card, newTitle, newAuthor, newPages, readBtn, delBook;
	
	
	// Display each book in myLibrary
	myLibrary.forEach( (book) => {
//			console.log(book.title + '...' + book.index);
		card = document.createElement('div');
		newTitle = document.createElement('h1');
		newAuthor = document.createElement('p');
		newPages = document.createElement('p');
		readBtn = document.createElement('button');
		readBtn.addEventListener('click', function () {
			if (book.read == 1) {
				book.read = 0;
				render();
				return;
			}
			book.read = 1;
			// readBtn.textContent = 'Read';
			render();
			// Is calling render the cleanest, simplist way to do this? It seems overkill to remove and add again all books.
			// I'd like to get this to reference a toggle funciton in the Book creator funciton...is this posible with factory (vs constructor?) - see TOP instructions 6.1
		})
		delBook = document.createElement('button');
		delBook.addEventListener('click', function () {
			if (confirm(`Do you want to delete ` + book.title + ` from your library?`)) {
			myLibrary.splice(book.index, 1);
			// is there a need to change indexes so there's no numerical gap?
			render();
			}
		});
		populateStorage();
		library.appendChild(card);
		card.appendChild(newTitle);
		card.appendChild(newAuthor);
		card.appendChild(newPages);
		card.appendChild(readBtn);
		card.appendChild(delBook);
		card.style.backgroundColor = randomColor();
		card.className = 'book';
		newTitle.textContent = book.title;
		newAuthor.textContent = `by ${book.author}`;
		newPages.textContent = `${book.pages} pages`;
		if (book.read) {
			readBtn.textContent = 'Read';
		}else {
			readBtn.textContent = 'Not Read';
		}
		delBook.textContent = 'Delete';
		// Storage
		
		
		populateStorage();
	});
	
	checkLocalStorage();
}

function checkLocalStorage() {
	console.log("=== LOCAL STORAGE ===");
	for (i = 0; i < localStorage.length; i++)   {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
	}
	console.log('-------');
}

function populateStorage() {
	localStorage.clear();
	localStorage.setItem('library', JSON.stringify(myLibrary));
}



function randomColor() {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return `rgb(${r},${g},${b})`;
}

// Stored books auto-populate
if(localStorage.getItem('library')) {
	myLibrary = JSON.parse(localStorage.getItem('library'));
	render();
} else {
	alert('start here');	
}


// Toggle READ




//========NOTES========\\
/*

	Local Storage
	Make it look good.


*/





/*///=====NOTES======\\\\*\
to call a HTML element in JS:
	$('element')
		e.g.: $('body').on('click', function...)
		https://m.youtube.com/watch?v=fjJoX9F_F5g
			minute 6
		/*/
		