import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project, ProjectAdapter } from './projects/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient,
    private adapter: ProjectAdapter) { }

  rootURL = "https://localhost:7040/api/";

  getProjects(): Observable<Project[]>
  {
    return this.http.get<Project[]>(this.rootURL + "Project").pipe(
      map(
        (data: any[]) => data.map(item => this.adapter.adapt(item))));
  }
  getSoftwareProjects(): Observable<Project[]>
  {
    return this.http.get<Project[]>(this.rootURL + "Project/byCategory/software").pipe(
      map(
        (data: any[]) => data.map(item => this.adapter.adapt(item))));
  }
  getHardwareProjects(): Observable<Project[]>
  {
    return this.http.get<Project[]>(this.rootURL + "Project/byCategory/hardware").pipe(
      map(
        (data: any[]) => data.map(item => this.adapter.adapt(item))));
  }
  getAutomotiveProjects(): Observable<Project[]>
  {
    return this.http.get<Project[]>(this.rootURL + "Project/byCategory/automotive").pipe(
      map(
        (data: any[]) => data.map(item => this.adapter.adapt(item))));
  }
  addProject(project: any)
  {
    return this.http.post(this.rootURL + "Project/", {project});
  }
  deleteProject(id: any): Observable<Object>
  {
    return this.http.delete(this.rootURL + "Project/" + String(id));
  }

  updateProject(id: any, project: any)
  {
    return this.http.put(this.rootURL + "Project/" + String(id), {project})
  }
}
