import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/noteService/note.service';
import { NoteObj } from 'src/assets/type';

@Component({
  selector: 'app-notescontainer',
  templateUrl: './notescontainer.component.html',
  styleUrls: ['./notescontainer.component.scss']
})
export class NotescontainerComponent implements OnInit {
  
  notesList : NoteObj[] = []

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.getAllNotesCall().subscribe(
      (res) => {
        // Assuming res.data contains an array of notes
        this.notesList = res.filter((note: NoteObj) => note.isArchived === false && note.isDeleted === false);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleUpdateNotesList($event: {action: string, data: NoteObj}) {
    console.log($event);
    const {action, data} = $event
    if(action === "create") {
      this.notesList = [$event.data, ...this.notesList]
    } else if(action === "archive" || action === "trash") {
      this.notesList = this.notesList.filter(note => note.noteId != data.noteId)
    }
  }
}