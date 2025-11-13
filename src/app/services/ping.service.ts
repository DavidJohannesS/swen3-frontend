import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PingService {

  private readonly URL = 'http://localhost:8083/api/documents/ping';

  constructor(private http: HttpClient) {}

  ping(): Observable<string> {
    return this.http.get(this.URL, { responseType: 'text' });
  }
}
