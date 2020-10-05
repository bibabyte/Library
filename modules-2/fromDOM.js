function elements() {
	// Associating divs in HTML with JS
	const library = document.querySelector('#library');
	const bookForm = document.querySelector('#newBookDiv');
	const welcome = document.querySelector('#welcome');
	const buttons = document.querySelector('#buttons');
	const populated = document.querySelector('#populated');
	const welcomeBtns = document.createElement('div');
	const menu = document.querySelector('#menu');
	const title = document.querySelector('#title');
	const add = document.querySelector('#add');
	
	const myLibrary = [];
	
	return {library, bookForm, welcome, buttons, populated, welcomeBtns, menu, title, add, myLibrary};
}

export { elements }