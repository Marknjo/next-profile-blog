import BlogModel from '../../lib/BlogModel';
import BlogCard from './BlogCard';
import styles from './BlogGrid.module.css';

interface BlogGridProps {
  blogs: BlogModel[];
}

const BlogGrid = ({ blogs }: BlogGridProps) => {
  return (
    <ul className={styles.grid}>
      {blogs.map(blog => (
        <BlogCard key={blog.slug} {...blog} />
      ))}
    </ul>
  );
};

export default BlogGrid;
