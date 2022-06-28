import type { GetStaticProps, NextPage } from 'next';
import BlogPosts from '../../components/blog/BlogPosts';
import BlogModel from '../../lib/BlogModel';
import QueryBlog from '../../lib/PostQueries';

const Blog: NextPage<{ posts: BlogModel[] }> = ({ posts }) => {
  return <BlogPosts blogs={posts} />;
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await QueryBlog.getPosts();

  return {
    props: {
      posts,
    },
  };
};
