import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";
import { ImgSrc, ImgSrcAdapter } from "./ImgSrc.model";

export class Project{
    constructor(public id: number, public title: string, public description: string, public imgSrcs: ImgSrc[], public content: any, public category: string, public openState: boolean)
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

        // // Create the string that contains the HTML for the div element
        // let htmlString = item.content;

        // // Use the createElement() method to create the div element
        // let divElement = document.createElement('div');

        // // Set the innerHTML property of the element to the HTML string
        // divElement.innerHTML = htmlString;


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