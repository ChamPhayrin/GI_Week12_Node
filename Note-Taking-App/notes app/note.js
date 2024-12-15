const fs = require("fs");
const chalk = require("chalk");

const getNotes =  () => {
	console.log("returning notes...");
};

// ADDING NOTES FUNC
const addNote = (title, body) => {
	const notes = loadNotes(); //loads notes.json

	const duplicateNote = notes.find((note) => {return note.title === title})

	if (!duplicateNote) {
		//if duplicateNotes array is 0
		notes.push({
			//pushing note object into array
			title: title,
			body: body,
		});
		saveNotes(notes); //saving note into notes.json
		console.log(chalk.green.inverse("new note added")); //displaying new note message
	} else {
		//if duplicateNotes array is not 0
		console.log(chalk.red.inverse("ERROR: duplicate title")); //displaying error
	}
};

// REMOVING NOTE FUNC
const removeNote = (title) =>{
	const notes = loadNotes(); //loading notes.json

	const keepingNotes = notes.filter((note) => {return note.title != title}); //if notes.title is not equal to title push into filtered array

	if (keepingNotes.length < notes.length) {
		//if keepingNotes is less than notes
		console.log(chalk.green.inverse(`Removed: ${title}`)); //display removed title message
		return saveNotes(keepingNotes); //saves to notes.json
	}

	//if condition if not met
	console.log(chalk.red.inverse(`ERROR: ${title} not found`)); //displays error
};

// SAVING NOTES FUNC
const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes); //turning notes into JSON string
	fs.writeFileSync("notes.json", dataJSON); //watching for changes in dataJSON and writing it into notes.json
};

// LOADING NOTES FUNC
const loadNotes = () => {
	try {
		//try to do all this code
		const dataBuffer = fs.readFileSync("notes.json");
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (e) {
		//if code doesnt work, catch all errors
		return []; //returns empty array in order to start array
	}
};


//LISTING NOTES FUNC
const listNotes = ()=>{
  const notes = loadNotes();
  console.log(chalk.green.inverse('Your notes:'));
  notes.forEach(note => {
    console.log(chalk.green(note.title))
  });
}

//READING NOTES FUNC
const readNote = (title)=>{
  const notes = loadNotes();
  const foundNote = notes.find((note) => {return note.title === title})

  if(foundNote){
    console.log(chalk.green.inverse(foundNote.title))
    console.log(chalk.green(foundNote.body))
    return;
  }
  console.log(chalk.red.inverse(`ERROR: ${title} not found`))
}


// EDITING NOTES FUNC
const editNote = (title, body) => {
	const notes = loadNotes();
	
  const foundNote = notes.find((note) => {return note.title === title})

	if(foundNote){
		removeNote(foundNote.title);
		addNote(title, body);
		console.log(chalk.cyan.inverse(foundNote.title))
		console.log(chalk.cyan(foundNote.body))
		return;
	}
  console.log(chalk.red.inverse(`ERROR: ${title} not found`))

}


module.exports = {
	//exporting functions
	getNotes: getNotes,
	addNote: addNote,
	loadNotes: loadNotes,
	removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
	editNote: editNote
};
