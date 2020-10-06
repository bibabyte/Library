// Create books with FACTORY FUNCTION
function createBook(title, author, pages, read, index, color) {
	//var book = Object.create(createBook.prototype); // This doens't seem necesary. Why was it here and what should it do?

	return {title, author, pages, read, index, color};
}

let bbtns = (() => {
	const welcomeBtns = document.createElement('div');
	const library = document.querySelector('#library');
	const bookForm = document.querySelector('#newBookDiv');
	const welcome = document.querySelector('#welcome');
	const buttons = document.querySelector('#buttons');
	const populated = document.querySelector('#populated');
	const menu = document.querySelector('#menu');
	const title = document.querySelector('#title');
	
	welcomeBtns.classList.add('welcomeBtns');
	populated.classList.add('populated');
	
	const add = document.querySelector('#add');
	
	
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
	addBookBtn.addEventListener('click', () => bbtns.bookForm.classList.toggle('formOpen'));
	// Hiding form after submission is in addBooktoLibrary() function
	add.addEventListener('click', () => bbtns.bookForm.classList.toggle('formOpen'));
	
	return {welcomeBtns, library, bookForm, welcome, buttons, populated, menu, title, personalizeBtn, addBookBtn, add};
})();

export { createBook, bbtns }