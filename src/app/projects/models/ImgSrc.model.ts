import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";

export class ImgSrc{
    constructor(public id: number, public src: string)
    {}
}

@Injectable({providedIn: "root"})
export class ImgSrcAdapter implements Adapter<ImgSrc>
{
    adapt(item: any): ImgSrc
    {
        return new ImgSrc
        (
            item.id,
            item.src
        );
    }
}