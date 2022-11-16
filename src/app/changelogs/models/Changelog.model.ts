import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";
import { ChangeLineItem, ChangeLineItemAdapter } from "./ChangeLineItem.model";

export class Changelog
{
  constructor(public id: Number, public release: string, public changeLineItems: ChangeLineItem[], public team: string)
  {}
}

@Injectable({providedIn: "root"})
export class ChangelogAdapter implements Adapter<Changelog>
{
    constructor (private adapter: ChangeLineItemAdapter)
    {}
    adapt(item: any): Changelog
    {
        let temparray: ChangeLineItem[] = [];
        for(var change of (item.changeLineItems))
        {
            temparray.push(this.adapter.adapt(change));
        }
        return new Changelog
        (
            item.id,
            item.release,
            temparray,
            item.team
        );
    }
}