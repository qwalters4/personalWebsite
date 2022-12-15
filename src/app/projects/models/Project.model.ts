import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";

export class Project{
    constructor(public id: number, public title: string, public description: string, public content: any, public category: string, public imgHeader: string, public openState: boolean)
    {}
}

@Injectable({providedIn: "root"})
export class ProjectAdapter implements Adapter<Project>
{
    constructor ()
    {}
    adapt(item: any): Project
    {
        return new Project
        (
            item.id,
            item.title,
            item.description,
            item.content,
            item.category,
            item.imgHeader,
            false
        );
    }
}