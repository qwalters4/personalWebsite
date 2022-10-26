import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = "https://localhost:7040/api/"

  getChangelogs()
  {
    return this.http.get<Changelog>(this.rootURL + "Changelog");
  }
  addChangelog(changelog: any)
  {
    return this.http.post(this.rootURL + "Changelog", {changelog});
  }
}

interface Changelog
{
  id: Number;
  release: string;
  changelineitems: ChangeLineItem[];
  team: string;
}

interface ChangeLineItem
{
  id: Number;
  type: string;
  serviceName: string;
  description: string;
  details: string;
}
