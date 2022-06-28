export default class BlogModel {
  constructor(
    public slug: string,
    public title: string,
    public image: string,
    public excerpt: string,
    public date: string,
    public isFeatured: boolean = false,
    public content?: string
  ) {}
}
