import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import {PingService} from '../../services/ping.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  private fileSubject = new BehaviorSubject<File | null>(null);
  file$ = this.fileSubject.asObservable();

  constructor(
    private documentService: DocumentService,
    private pingService: PingService

  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.fileSubject.next(file);
  }

uploadFile() {
  const file = this.fileSubject.value;
  if (!file) {
    alert('Bitte PDF auswählen!');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', file.name.replace('.pdf', ''));
  formData.append('originalFileName', file.name);
  formData.append('mimeType', file.type);
  formData.append('sizeInBytes', file.size.toString());

  this.documentService.saveDocument(formData).subscribe({
    next: () => alert("Dokument gespeichert!"),
    error: (err) => console.error(err)
  });
}
  pingBackend(): void {
    this.pingService.ping().subscribe({
      next: (res) => {
        console.log('Ping erfolgreich:', res);
        alert('Backend antwortet: ' + res);
      },
      error: (err) => {
        console.error('Ping Fehler:', err);
        alert('Backend nicht erreichbar.');
      }
    });
  }

}
