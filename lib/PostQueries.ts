import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import BlogModel from './BlogModel';

interface GrayMatterResponse {
  content: string;
  data: BlogModel;
}

class PostQueries {
  private postsContent: BlogModel[] = [];
  private postFiles: string[] = [];
  private postSlugs: string[] = [];

  private static initializer: PostQueries;

  static get instance() {
    if (!PostQueries.initializer) {
      PostQueries.initializer = new PostQueries();
      return PostQueries.initializer;
    }

    return PostQueries.initializer;
  }

  private constructor() {
    this.findPostFiles();
    this.mapBlogPostsMeta();
  }

  getPostBySlug(slug: string) {
    if (this.postsContent.length === 0) {
      return false;
    }

    if (this.postsContent.length === 1) {
      const foundPost = this.postsContent[0];

      return foundPost.slug === slug ? foundPost : false;
    }

    if (this.postsContent.length > 1) {
      const foundPost = this.postsContent.find(post => post.slug === slug);

      const results = foundPost ? foundPost : false;

      return results;
    }
  }

  getPosts() {
    return this.getPostsFactory();
  }

  getFeaturedPosts() {
    return this.getPostsFactory(true);
  }

  getSlugs() {
    if (this.postSlugs.length === 1) {
      return this.postSlugs;
    }

    if (this.postSlugs.length > 1) {
      /// Update posts slugs

      return this.postSlugs;
    }

    return [];
  }

  private getPostsFactory(filterIsFeatured: boolean = false) {
    if (this.postsContent.length > 1) {
      let sortedPosts = this.sortedPostsByDate();

      /// Return filtered posts
      if (filterIsFeatured) {
        sortedPosts = sortedPosts.filter(post => post.isFeatured);
      }

      return sortedPosts;
    }

    if (this.postsContent.length === 1) {
      const post = this.postsContent;

      const results = filterIsFeatured && post[0].isFeatured ? post : post;
      return results;
    }

    return [];
  }

  private sortedPostsByDate() {
    const getDateByTime = (date: string) => {
      return new Date(date).getTime();
    };

    return this.postsContent.sort(
      (postA, postB) => getDateByTime(postA.date) - getDateByTime(postB.date)
    );
  }

  private findPostFiles = () => {
    const blogPostPath = join(process.cwd(), 'blogPosts');
    const foundBlogPosts = readdirSync(blogPostPath, 'utf-8');

    this.postFiles = foundBlogPosts;
  };

  private mapBlogPostsMeta = () => {
    const blogPostPaths = this.postFiles;

    if (blogPostPaths.length > 0) {
      blogPostPaths.forEach(postFile => {
        this.extractBlogContent(postFile);
      });

      return;
    }
    this.postsContent = [];
    return;
  };

  private extractBlogContent(postFile: string) {
    // manage slug
    const slug = postFile.replace(/\.md$/, '');
    this.postSlugs.push(slug);

    // create path
    const postPath = join(process.cwd(), 'blogPosts', postFile);

    // Read file content
    const fileContent = readFileSync(postPath, 'utf-8');

    // extract Get Gray matter
    const matterContent: GrayMatterResponse = matter(
      fileContent
    ) as unknown as GrayMatterResponse;

    // Add slug to the data/content
    matterContent.data.slug = slug!;

    // Content
    const content = {
      ...matterContent.data,
      content: matterContent.content,
    };

    this.postsContent.push(content);
  }
} // End class

const QueryBlog = PostQueries.instance;

export default QueryBlog;
