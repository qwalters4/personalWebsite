import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";
import { ImgSrc, ImgSrcAdapter } from "./ImgSrc.model";

export class Project{
    constructor(public id: number, public title: string, public description: string, public imgSrcs: ImgSrc[], public content: string, public category: string, public openState: boolean)
    {}
}

@Injectable({providedIn: "root"})
export class ProjectAdapter implements Adapter<Project>
{
    constructor (private adapter: ImgSrcAdapter)
    {}
    adapt(item: any): Project
    {
        let temparray: ImgSrc[] = [];
        for(var img of (item.imgSrcs))
        {
            temparray.push(this.adapter.adapt(img));
        }
        return new Project
        (
            item.id,
            item.title,
            item.description,
            temparray,
            item.content,
            item.category,
            false
        );
    }
}