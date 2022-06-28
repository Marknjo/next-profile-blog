import type { GetStaticProps, NextPage } from 'next';
import FeaturedBlogs from '../components/Home/FeaturedBlogs';
import Hero from '../components/Home/Hero';
import BlogModel from '../lib/BlogModel';
import QueryBlog from '../lib/PostQueries';

const Home: NextPage<{ posts: BlogModel[] }> = ({ posts }) => {
  return (
    <>
      <Hero />
      <FeaturedBlogs blogs={posts} />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const featuredPosts = QueryBlog.getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
};
