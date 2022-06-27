import BlogModel from '../../lib/BlogModel';
import BlogGrid from '../blog/BlogGrid';
import styles from './FeaturedBlogs.module.css';

interface FeaturedBlogsProps {
  blogs: BlogModel[];
}

function FeaturedBlogs({ blogs }: FeaturedBlogsProps) {
  return (
    <section className={styles.featured}>
      <h2>Featured Articles</h2>
      <BlogGrid blogs={blogs} />
    </section>
  );
}

export default FeaturedBlogs;
