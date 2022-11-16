import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";

export class ChangeLineItem
{
  constructor(public id: Number, public type: string, public serviceName: string, public description: string, public details: string)
  {}
}

@Injectable({providedIn: "root"})
export class ChangeLineItemAdapter implements Adapter<ChangeLineItem>
{
    adapt(item: any): ChangeLineItem
    {
        return new ChangeLineItem
        (
            item.id,
            item.type,
            item.serviceName,
            item.description,
            item.details
        );
    }
}