import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/dataService/data.service';
import { NoteService } from 'src/app/services/noteService/note.service';
import { NoteObj } from 'src/assets/type';

@Component({
  selector: 'app-trashcontainer',
  templateUrl: './trashcontainer.component.html',
  styleUrls: ['./trashcontainer.component.scss']
})
export class TrashcontainerComponent implements OnInit {
  notesList : NoteObj[] = []
  //notesList: { title: string; description: string; noteID: number; color:string, archive:boolean }[] = [];
  
  @Output() updateList = new EventEmitter<{ action: string, data: { title: string, description: string, noteID: number, color:string, archive: boolean } }>();
  
  iconAction: string = '';
  searchString!:string
  subscription!:Subscription

  constructor(private noteService: NoteService, private data: DataService) {}

  ngOnInit(): void {
    this.noteService.getAllNotesCall().subscribe(
      (res) => {
        // Assuming res.data contains an array of notes
        this.notesList = res.filter((note: NoteObj) => note.isDeleted === true);
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
    } else if(action === "untrashed" || action === "trash") {
      this.notesList = this.notesList.filter(note => note.noteId != data.noteId)
    }
  }  

}