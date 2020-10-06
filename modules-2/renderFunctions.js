//import {} from

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

function toggleBookRead() {
	if (book.read == 1) {
		book.read = 0;
		render();
		return;
	}
	book.read = 1;
	render();
	// Is calling render the cleanest, simplist way to do this? It seems overkill to remove and add again all books.
	// I'd like to get this to reference a toggle funciton in the Book creator funciton...is this posible with factory (vs constructor?) - see TOP instructions 6.1
}

function deleteBook() {
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
}

function bookIsRead() {
	if (book.read) {
		readBtn.textContent = 'Read';
		readBtn.className = 'read';
	}else {
		readBtn.textContent = 'Not Read';
		readBtn.className = 'notRead';
	}	
}

function names() {
	card.className = 'book';
	newBtnDiv.className = 'cardButtons';
	newTitle.textContent = book.title;
	newAuthor.textContent = `by ${book.author}`;
	newPages.textContent = `${book.pages} pages`;
	bookIsRead();
	delBook.textContent = 'Delete';
	delBook.className = 'delete';	
}

function displayBook(book) {
	let card, newTitle, newAuthor, newPages, newBtnDiv,readBtn, delBook;
	card = document.createElement('div');
	newTitle = document.createElement('h1');
	newAuthor = document.createElement('p');
	newPages = document.createElement('p');
	newBtnDiv = document.createElement('div');
	readBtn = document.createElement('button');
	readBtn.addEventListener('click', toggleBookRead());
	delBook = document.createElement('button');
	delBook.addEventListener('click', deleteBook());
	populateStorage();
	library.appendChild(card);
	card.appendChild(newTitle);
	card.appendChild(newAuthor);
	card.appendChild(newPages);
	card.appendChild(newBtnDiv);
	newBtnDiv.appendChild(readBtn);
	newBtnDiv.appendChild(delBook);
	card.style.backgroundColor = book.color;
	names();
}


export { toggleView, clearNodes, displayBook }