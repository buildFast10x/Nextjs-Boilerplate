import seoInterface from "./seoInterface";

export default class seoImpl implements seoInterface {
    title!: string
    description!: string
    keywords!: string
    image!: string
    url!: string
    pagetype?: string

    initFromDataObj(data: seoInterface) {
        this.title = data.title;
        this.description = data.description;
        this.keywords = data.keywords;
        this.image = data.image;
        this.url = data.url;
        this.pagetype = data.pagetype;
    }
}