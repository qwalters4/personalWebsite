import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';

@Component({
  selector: 'app-changelogs',
  templateUrl: './changelogs.component.html'
})
export class ChangelogsComponent
{
  panelOpenState = false;

  changelogs: Changelog[] = [];
  stringoutput: string = "";

  constructor(private api:AppService) {}

  ngOnInit()
  {
    this.api.getChangelogs().subscribe((data: any) => {this.changelogs = data});
  }

  getChangelogs()
  {
    return fetch("https://localhost:7040/api/Changelog")
    .then(res => res.json())
    .then(res => { return res as Changelog[]});
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
