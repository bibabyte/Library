import { myLibrary, welcome, populatedButtons, welcomeButtons, library } from '../script.js';
import { createBook, myLibrary } from './createBook.js';

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
	
	let card, newTitle, newAuthor, newPages, newBtnDiv,readBtn, delBook;
	
	
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

	return {}

}

export { render }