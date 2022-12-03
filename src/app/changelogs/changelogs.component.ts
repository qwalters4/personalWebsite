import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { Changelog } from './models/Changelog.model';
import { subscribeOn } from 'rxjs';
import { waitForAsync } from '@angular/core/testing';
import {DataSource} from '@angular/cdk/collections';
import {Sort} from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ChangeLineItem } from './models/ChangeLineItem.model';

@Component({
  selector: 'app-changelogs',
  templateUrl: './changelogs.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ChangelogsComponent
{
  panelOpenState = false;

  popUpMsg: string = "";
  saveNeeded: boolean = false;
  changelogs: Changelog[] = [];
  changelogsUI: Changelog[] = [];
  stringoutput: string = "";
  columnsToDisplay = ['type', 'serviceName', 'description'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: ChangeLineItem | null | undefined;

  constructor(private api:AppService) {}

  ngOnInit()
  {
    this.api.getChangelogs().subscribe((data: any) => {this.changelogs = data});
  }

  deleteChangelog(id: number)
  {
    this.api.deleteChangelog(id).subscribe((data: any) => {this.popUpMsg = data});
    
    //remove the changelog locally to update UI
    var c: Changelog = this.changelogs.filter(x => x.id == id)[0];
    var index: number = this.changelogs.indexOf(c)
    if (index > -1)
    {
      this.changelogs.splice(index, 1);
    }
  }

  updateChangelog(id: number, changelog: Changelog)
  {
    this.api.updateChangelog(id, changelog).subscribe((data: any) => {this.popUpMsg = data});
  }

  saveChanges(event: any)
  {
    let temparray: Changelog[] = this.changelogs.filter(x => x.update == true);

    temparray.forEach(element =>
      {
        this.updateChangelog(element.id, element);
      });
  }

  //Function to trigger changes in array
  public trackItem (index: number, item: Changelog)
  {
    return item.id;
  }

  onKey(event: any, c: Changelog)
  {
    c.update = true;
    this.saveNeeded = true;
  }
}
