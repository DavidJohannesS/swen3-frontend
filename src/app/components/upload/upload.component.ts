import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentService } from '../../services/document.service';

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

  constructor(private documentService: DocumentService) {}

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

    const doc = {
      title: file.name.replace('.pdf', ''),
      originalFileName: file.name,
      mimeType: file.type,
      sizeInBytes: file.size
    };

    this.documentService.saveDocument(doc).subscribe({
      next: () => alert("Dokument gespeichert!"),
      error: (err) => console.error(err)
    });
  }
}
