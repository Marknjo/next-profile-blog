import BlogModel from '../../lib/BlogModel';
import BlogGrid from './BlogGrid';
import styles from './BlogPosts.module.css';

const BlogPosts = ({ blogs }: { blogs: BlogModel[] }) => {
  return (
    <section className={styles.posts}>
      <h1>View All Blogs</h1>

      {blogs.length === 0 && <p>No posts to display</p>}
      {blogs.length > 0 && <BlogGrid blogs={blogs} />}
    </section>
  );
};

export default BlogPosts;
