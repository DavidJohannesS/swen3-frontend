import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaperDocument } from '../models/paper-document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private readonly BASE_URL = 'http://localhost:8083/api/documents';

  constructor(private http: HttpClient) {}

  saveDocument(doc: PaperDocument): Observable<PaperDocument> {
    return this.http.post<PaperDocument>(this.BASE_URL, doc);
  }

  getAllDocuments(): Observable<PaperDocument[]> {
    return this.http.get<PaperDocument[]>(this.BASE_URL);
  }

  getDocumentById(id: number): Observable<PaperDocument> {
    return this.http.get<PaperDocument>(`${this.BASE_URL}/${id}`);
  }

  searchDocuments(term: string): Observable<PaperDocument[]> {
    const params = new HttpParams().set('term', term);
    return this.http.get<PaperDocument[]>(`${this.BASE_URL}/search`, { params });
  }
}
