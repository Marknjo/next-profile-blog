import { constants, accessSync, readFileSync } from 'fs';
import { readdir } from 'fs/promises';
import matter from 'gray-matter';
import { join } from 'path';
import BlogModel from './BlogModel';

interface GrayMatterResponse {
  content: string;
  data: BlogModel;
}

let postsFiles: string[] = [];
let fetchedPosts: BlogModel[] = [];

class PostQueries {
  blogPosts: string[] = [];

  private static initializer: PostQueries;

  static get instance() {
    if (!PostQueries.initializer) {
      PostQueries.initializer = new PostQueries();
      return PostQueries.initializer;
    }

    return PostQueries.initializer;
  }

  constructor() {}

  async getPostBySlug(slug: string) {
    const allPosts = await this.postsFetcher();

    if (allPosts.length === 0) {
      return false;
    }

    if (allPosts.length === 1) {
      const foundPost = allPosts[0];

      return foundPost.slug === slug ? foundPost : false;
    }

    if (allPosts.length > 1) {
      const foundPost = allPosts.find(post => post.slug === slug);

      const results = foundPost ? foundPost : false;

      return results;
    }
  }

  async getPosts() {
    return await this.getPostsFactory();
  }

  async getFeaturedPosts() {
    return await this.getPostsFactory(true);
  }

  async getSlugs() {
    const postSlugs = await this.mapSlugs();

    if (postSlugs.length > 0) {
      return postSlugs;
    }

    return [];
  }

  private async getPostsFactory(filterIsFeatured: boolean = false) {
    const mappedPosts = await this.postsFetcher();

    if (mappedPosts.length > 1) {
      let sortedPosts = this.sortedPostsByDate(mappedPosts);

      /// Return filtered posts
      if (filterIsFeatured) {
        sortedPosts = sortedPosts.filter(post => post.isFeatured);
      }

      return sortedPosts;
    }

    if (mappedPosts.length === 1) {
      const post = mappedPosts;

      const results = filterIsFeatured && post[0].isFeatured ? post : post;
      return results;
    }

    return [];
  }

  private sortedPostsByDate(mappedPosts: BlogModel[]) {
    const getDateByTime = (date: string) => {
      return new Date(date).getTime();
    };

    return mappedPosts.sort(
      (postA, postB) => getDateByTime(postA.date) - getDateByTime(postB.date)
    );
  }

  async mapSlugs() {
    const foundPostFiles = await this.filesFetcher();
    const slugs = foundPostFiles.map(postFile => postFile.replace(/\.md$/, ''));

    return slugs;
  }

  private async fetchFiles() {
    const path = join(process.cwd(), 'blogPosts');
    const allPost = await readdir(path, 'utf-8');

    return allPost;
  }

  private async filesFetcher() {
    let updatesTracker: string[] = [];
    // update global fetchFiles
    if (postsFiles.length === 0) {
      postsFiles = await this.fetchFiles();
      return postsFiles;
    }

    if (postsFiles.length > 0) {
      updatesTracker = postsFiles;
      // async will take some time
      postsFiles = await this.fetchFiles();
    }

    return updatesTracker;
  }

  private async postsFetcher() {
    let updatesTracker: BlogModel[] = [];
    // update global fetchFiles
    if (postsFiles.length === 0) {
      fetchedPosts = await this.transformBlogContent();
      return fetchedPosts;
    }

    if (fetchedPosts.length > 0) {
      updatesTracker = fetchedPosts;

      // async will take some time
      fetchedPosts = await this.transformBlogContent();
    }

    return updatesTracker;
  }

  private async transformBlogContent() {
    const blogPostPaths = await this.filesFetcher();

    if (blogPostPaths.length > 0) {
      const mappedPosts = blogPostPaths.map(postFile =>
        this.extractBlogContent(postFile)
      );

      if (Object.values(mappedPosts).some(post => !post)) {
        return mappedPosts.filter(post => !!post) as BlogModel[];
      }

      return mappedPosts as BlogModel[];
    }
    return [];
  }

  private extractBlogContent(postFile: string) {
    // manage slug
    const slug = postFile.replace(/\.md$/, '');

    // create path
    const postPath = join(process.cwd(), 'blogPosts', postFile)!;

    let fileExits: boolean = true;

    try {
      accessSync(postPath);
    } catch (error) {
      fileExits = false;
    }

    if (!fileExits) return false;

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

    return content;
  }
} // End class

// const QueryBlog = PostQueries.instance;
const QueryBlog = new PostQueries();

export default QueryBlog;
