

function populatedButtons() {
	welcomeBtns.classList.add('hidden');
	populated.classList.remove('hidden');
	title.textContent = 'My Library';
}

function welcomeButtons() {
	welcomeBtns.classList.remove('hidden');
	populated.classList.add('hidden');
	addBookBtn.textContent = 'Add a Book';
	personalizeBtn.textContent = 'Personalize';
	
}

export { populatedButtons, welcomeButtons }