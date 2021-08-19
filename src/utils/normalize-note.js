const normalizeNote = (note) => {
	return note.toUpperCase().replace(/[,^_]/, '');
};

export default normalizeNote;
