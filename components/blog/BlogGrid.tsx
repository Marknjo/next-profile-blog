import BlogCard from './BlogCard';
import styles from './BlogGrid.module.css';

interface BlogGridProps {
  blogs: { [key: string]: any }[];
}

function BlogGrid({ blogs }: BlogGridProps) {
  return (
    <section className={styles.grid}>
      {blogs.map(blog => {
        <BlogCard key={blog.id} {...blog} />;
      })}
    </section>
  );
}

export default BlogGrid;
