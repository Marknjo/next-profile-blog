import BlogModel from '../../lib/BlogModel';
import BlogCard from './BlogCard';
import styles from './BlogGrid.module.css';

interface BlogGridProps {
  blogs: BlogModel[];
}

const BlogGrid = (props: BlogGridProps) => {
  return (
    <section className={styles.grid}>
      {props.blogs.map(blog => {
        <BlogCard key={blog.slug} {...blog} />;
      })}
    </section>
  );
};

export default BlogGrid;
