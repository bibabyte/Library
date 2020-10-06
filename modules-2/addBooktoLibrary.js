import { myLibrary, randomColor, populateStorage, render } from '../script.js';
import { createBook, bbtns } from './createBook.js';

//import { render } from './render.js'
 var book;

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
	 book = createBook(title, author, pages, read, index, color);
	
	// Add book to myLibrary
	myLibrary.push(book);
	populateStorage();	
	
	// Hide form
	bbtns.bookForm.classList.remove('formOpen');
	
	
	render();
	
}


export { addBooktoLibrary, book }

