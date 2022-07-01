import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
import BlogContent from '../../components/blog/BlogContent';
import BlogModel from '../../lib/BlogModel';
import QueryBlog from '../../lib/PostQueries.server';

const Article: NextPage<{
  blog: string;
  frontmatter: BlogModel;
  slug: string;
}> = ({ blog, frontmatter }) => {
  return <BlogContent blog={blog} frontmatter={frontmatter} />;
};

export default Article;

export const getServerSideProps: GetServerSideProps = async context => {
  const { params } = context;

  const slug = params!.slug as string;

  const foundBlog = await QueryBlog.getPostBySlug(slug)!;

  if (!foundBlog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog: foundBlog.code,
      frontmatter: foundBlog.frontmatter,
    },
  };
};
