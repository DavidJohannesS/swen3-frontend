import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PaperDocument} from '../../models/paper-document.model';
import {DocumentService} from '../../services/document.service';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchQuery = '';
  results: PaperDocument[] = [];
  loading = false;
  error = '';

  constructor(private documentService: DocumentService) {}

  onSearch(): void {
    const term = this.searchQuery.trim();

    if (!term) {
      this.error = 'Bitte ein Suchwort eingeben';
      return;
    }

    this.loading = true;
    this.error = '';
    this.results = [];

    this.documentService.searchDocuments(term).subscribe({
      next: docs => {
        this.results = docs;
        this.loading = false;
      },
      error: () => {
        this.error = 'Fehler beim Abrufen der Suchergebnisse';
        this.loading = false;
      }
    });
  }
}
