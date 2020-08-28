// Associating divs in HTML with JS
const library = document.querySelector('#library');
const body = document.querySelector('#body');
const bookForm = document.querySelector('#newBook');

// Add book button
const addBookBtn = document.createElement('button');
addBookBtn.className = 'button';
addBookBtn.textContent = 'Add a Book';
body.appendChild(addBookBtn);

// Submit button
const submit = document.querySelector('#submit');

// Form hidden/visible
bookForm.classList.toggle('formHidden');
addBookBtn.addEventListener('click', () => bookForm.classList.toggle('formOpen'));
/*
	On submit change class to .formHidden
*/


// An array to store each card
let myLibrary = [];


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
	let author = document.querySelector('#fauthor').value;
	let title = document.querySelector('#ftitle').value;
	let pages = document.querySelector('#fpages').value;
	let read = document.querySelector('#fread').checked;
	
	let book = new Book(title, author, pages, read)
	
	myLibrary.push(book); 
	
//	submit.addEventListener('click', () => bookForm.classList.toggle('formHidden'));
	
	console.log(myLibrary);
	return bookForm.classList.toggle('formHidden');
	/*
		-	learn how to toggle the form to formHidden when form is submitted
	
		
		This function is called in the addBook function	
			only when there are items that hold those IDs
			
		IN MAKING THE FORM
			be sure that you use these IDs to identify each item.
	*/
	
	//CLEAR FORM
}


// Display books on screen
function render() {
	
	
	
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








/*/========TO DO=========\*\

Button
Form
	can start as a static form in HTML
	want it to be a pop-up form in final
		POSSIBLY;
			create div for form in HTML with class
			in CSS *hide* the div until/unless the 'add book' button is clicked
			can create a pop-out with translucent background to make it really pop.
			
			check out youtube videos on HTML/CSS for more info
Clear form
Render
Display



/*/

/*/===========THINGS TO STUDY============\*\
	querySelector vs getElementById
	*/