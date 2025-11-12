import { Component } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-upload',
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  // Observable für den aktuellen Datei-Namen
  private fileSubject = new BehaviorSubject<File | null>(null);
  file$ = this.fileSubject.asObservable();

  // Wird ausgelöst, wenn der User eine Datei auswählt
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Bitte nur PDF-Dateien hochladen!');
      input.value = ''; // reset
      return;
    }

    // Datei im Observable speichern
    this.fileSubject.next(file);
  }

  // Später kannst du hier die Upload-Logik ans Backend einfügen
  uploadFile(): void {
    const file = this.fileSubject.value;
    if (!file) {
      alert('Keine Datei ausgewählt!');
      return;
    }

    console.log('📄 Datei bereit zum Hochladen:', file.name);
    // Hier würdest du z. B. einen HTTP-Service aufrufen:
    // this.uploadService.upload(file).subscribe(...)
  }

}
