import { myLibrary, welcome, populatedButtons, welcomeButtons, library } from '../script.js';
import { createBook, myLibrary } from './createBook.js';
import { toggleView, clearNodes, displayBook } from './renderFunctions.js';



// Display books on screen
function render() {
	// Toggle welcome and display buttons
	toggleView();
	
	// Remove exisiting nodes from the display
	clearNodes();
	
	// Display each book in myLibrary
	myLibrary.forEach( displayBook(book) );

	return {}
}

export { render }


