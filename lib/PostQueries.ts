import { readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import BlogModel from './BlogModel';

interface GrayMatterResponse {
  content: string;
  data: BlogModel;
}

class PostQueries {
  private static initializer: PostQueries;

  static get instance() {
    if (!PostQueries.initializer) {
      PostQueries.initializer = new PostQueries();
      return PostQueries.initializer;
    }

    return PostQueries.initializer;
  }

  private constructor() {}

  async getPostBySlug(slug: string) {
    const allPosts = await this.mapBlogPostsMeta();

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
    const mappedPosts = await this.mapBlogPostsMeta();

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
    const foundPostFiles = await this.fetchPostFiles();
    const slugs = foundPostFiles.map(postFile => postFile.replace(/\.md$/, ''));

    return slugs;
  }

  private async fetchPostFiles() {
    const response = await fetch('http://127.0.0.1:3000/api/blogs');

    const foundPostFiles = (await response.json()) as {
      status: string;
      data: { posts: string[] };
    };

    return foundPostFiles.data.posts;
  }

  private async mapBlogPostsMeta() {
    const blogPostPaths = await this.fetchPostFiles();

    if (blogPostPaths.length > 0) {
      const mappedPosts = blogPostPaths.map(postFile =>
        this.extractBlogContent(postFile)
      );

      return mappedPosts;
    }
    return [];
  }

  private extractBlogContent(postFile: string) {
    // manage slug
    const slug = postFile.replace(/\.md$/, '');

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

    return content;
  }
} // End class

const QueryBlog = PostQueries.instance;

export default QueryBlog;
