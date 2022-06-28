import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
import BlogContent from '../../components/blog/BlogContent';
import BlogModel from '../../lib/BlogModel';
import QueryBlog from '../../lib/PostQueries';

const Article: NextPage<{ blog: BlogModel }> = ({ blog }) => {
  return <BlogContent blog={blog} />;
};

export default Article;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = QueryBlog.getSlugs();

  const params = slugs.map(slug => {
    return {
      params: { slug },
    };
  });

  return {
    paths: params,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { params } = context;

  const slug = params!.slug as string;

  const foundBlog = QueryBlog.getPostBySlug(slug);

  return {
    props: {
      blog: foundBlog,
    },
    revalidate: 60,
  };
};
