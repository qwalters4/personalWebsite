import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Project } from './models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
    softwareProjects: Project[] = [];
    hardwareProjects: Project[] = [];
    automotiveProjects: Project[] = [];
    test: string = "assets/test-image.jpg";
    
    constructor(private api: AppService)
    {}

    ngOnInit()
    {
        this.api.getSoftwareProjects().subscribe((data: any) => {this.softwareProjects = data});
        this.api.getHardwareProjects().subscribe((data: any) => {this.hardwareProjects = data});
        this.api.getAutomotiveProjects().subscribe((data: any) => {this.automotiveProjects = data});
    }
}
