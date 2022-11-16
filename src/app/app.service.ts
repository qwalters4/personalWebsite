import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Changelog, ChangelogAdapter } from './changelogs/models/Changelog.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient,
    private adapter: ChangelogAdapter) { }

  rootURL = "https://localhost:7040/api/";

  getChangelogs(): Observable<Changelog[]>
  {
    return this.http.get<Changelog[]>(this.rootURL + "Changelog").pipe(
      map(
        (data: any[]) => data.map(item => this.adapter.adapt(item))));
  }
  addChangelog(changelog: any)
  {
    return this.http.post(this.rootURL + "Changelog/", {changelog});
  }
  deleteChangelog(id: any): Observable<Object>
  {
    return this.http.delete(this.rootURL + "Changelog/" + String(id));
  }
}
