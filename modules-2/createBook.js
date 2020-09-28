// Create books with FACTORY FUNCTION
function createBook(title, author, pages, read, index, color) {
	//var book = Object.create(createBook.prototype); // This doens't seem necesary. Why was it here and what should it do?
	return {title, author, pages, read, index, color};
}


export { createBook }