// Associating divs in HTML with JS
const library = document.querySelector('#library');
const body = document.querySelector('#body');
const bookForm = document.querySelector('#newBook');


// Add book button
const addBookBtn = document.createElement('button');
addBookBtn.className = 'button';
addBookBtn.textContent = 'Add a Book';
body.appendChild(addBookBtn);


// Form hidden/visible
bookForm.classList.toggle('formHidden');
addBookBtn.addEventListener('click', () => bookForm.classList.toggle('formOpen'));
// Hiding form after submission is in addBooktoLibrary() function


// An array to store each card
let myLibrary = [];

//=========TESTING=========\\
let prince = new Book('The Little Prince', 'Antoine de Saint-Exupery', 37, 0);

let gatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 197, 1);
myLibrary.push(prince, gatsby)

// Book constructor and prototype funcitons
function Book(title, author, pages, read){
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.sayTitle = function() {
	console.log(title);
}

Book.prototype.about = function() {
	return (`${title} by ${author}, ${pages} pages, ${read}`);
}

// =====



// Create a book from the constructor, add it to myLibrary array
function addBooktoLibrary() {
	
	// Collect data from form
	let author = document.querySelector('#fauthor').value;
	let title = document.querySelector('#ftitle').value;
	let pages = document.querySelector('#fpages').value;
	let read = document.querySelector('#fread').checked;
	
	// Create Book object
	let book = new Book(title, author, pages, read);
	
	// Add book to myLibrary
	myLibrary.push(book); 
	console.log(myLibrary[myLibrary.length - 1]);
	
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
	
	// Display each book in myLibrary
	for (book of myLibrary) {
		console.log(book.title);
		
		let newDiv = document.createElement('div');
		let newTitle = document.createElement('h1');
		library.appendChild(newDiv);
		newDiv.appendChild(newTitle)
		newDiv.style.backgroundColor = randomColor();
		newDiv.className = 'book';
		newTitle.textContent = `${book.title}`;
		
		

		
	}
	//console.log(myLibrary[i][title]);
	
	/*
	for each item in myLibrary:
		create new *div*
			div header: title
			div includes: 
				title, pages.
			div has buttons:
				read?, delete
		
				
		MUST create funcitons for div buttons
	*/
}
render();



function randomColor() {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return `rgb(${r},${g},${b})`;
}


/*/========TO DO=========\*\

Render
	Currently titles appear. 
	make all of it appear.
	
Display
	make everything look good

Back to TOP for other functionality.
/*/

/*/===========THINGS TO STUDY============\*\
	querySelector vs getElementById
	*/