import { Routes } from '@angular/router';
import {UploadComponent} from './components/upload/upload.component';
import {SearchComponent} from './components/search/search.component';
import {UpdateComponent} from './components/update/update.component';
import {DeleteComponent} from './components/delete/delete.component';
import {SummaryComponent} from './components/summary/summary.component';


export const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: 'upload', component: UploadComponent },
  { path: 'search', component: SearchComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'delete', component: DeleteComponent },
  { path: 'summary', component: SummaryComponent },
  { path: '**', redirectTo: 'upload' }
];
