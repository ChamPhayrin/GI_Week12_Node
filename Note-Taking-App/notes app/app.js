const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./note')

// customize yargs version
yargs.version('1.1.0')

// create add command
yargs.command({
  command: 'add',
  describe: 'add a new note',
  builder:{
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'note body',
      demandOption: true,
      type: 'string'
    }
  } ,
  handler(argv) {
    notes.addNote(argv.title, argv.body)
  }
})

// create remove command
yargs.command({
  command: 'remove',
  describe: 'remove note',
  builder:{
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title)
  }
})

// create read command
yargs.command({
  command: 'read',
  describe: 'read a note',
  handler(argv) {
    notes.readNote(argv.title);
  }
})

// create list command
yargs.command({
  command: 'list',
  describe: 'list your notes',
  handler() {
    notes.listNotes();
  }
})

yargs.command({
  command: 'edit',
  describe: 'edit notes by looking for title',
  builder: {
    title:{
      describe: 'notes title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    notes.editNote(argv.title, argv.body);
  }
})

yargs.parse();
