import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-changelogs',
  templateUrl: './changelogs.component.html'
})
export class ChangelogsComponent {
  dec1: string[] = ["added test1", "removed test2", "Modify test3" ];

  public changelogs: Changes[] = [
    { "release": "October", "logs": this.dec1 }
  ];

}

interface Changes {
  release: string;
  logs: string[];
}
