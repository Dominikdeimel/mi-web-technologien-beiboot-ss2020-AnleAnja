import {ImageMetadata} from "./ImageMetadata";
import {Color} from "./Color";

export type ImageSorter = (source: ImageMetadata[]) => ImageMetadata[];

export const birthtime: ImageSorter = (source) => {
    return source.sort((a, b) =>
        a.birthtime > b.birthtime ? 1 : b.birthtime > a.birthtime ? -1 : 0)
}

export const name: ImageSorter = (data) => {
    return data.sort((a, b) => {
        const textA = a.filename.toUpperCase();
        const textB = b.filename.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
}

export const random: ImageSorter = (data) => {
    return data
        .sort(() => Math.random() - 0.5);
}

export const color: ImageSorter = (data) => {
    return data
        .map(img => ({color: new Color(img.mainColor), meta: img}))
        .sort((l, r) => l.color.hue - r.color.hue)
        .map(v => v.meta);
}