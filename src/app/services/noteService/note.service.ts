import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpService: HttpService) { }

  getAllNotesCall() {
    return this.httpService.getAllNotes("Notes");
  }

  addNoteCall(data: Object) {
    return this.httpService.addNote("Notes", data);
  }

  archiveNoteCall(noteId: number) {
    return this.httpService.archiveNote(`Notes/Archive/${noteId}`);
  }  

  trashNoteCall(NoteId: number) {
    return this.httpService.archiveNote(`Notes/Trash/${NoteId}`);
  }
}