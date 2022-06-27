import Image from 'next/image';
import Link from 'next/link';
import BlogModel from '../../lib/BlogModel';
import styles from './BlogCard.module.css';

function BlogCard({ date, image, title, slug, excerpt }: BlogModel) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  });
  const imageSrc = `/images/posts/${slug}/${image}`;
  const linkUrl = `/blog/${slug}`;
  return (
    <li className={styles.card}>
      <article>
        <Link href={linkUrl}>
          <a>
            <div className={styles.image}>
              <Image
                src={imageSrc}
                alt={title}
                width={300}
                height={150}
                layout={'responsive'}
              />
            </div>
          </a>
        </Link>

        <div className={styles.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </article>
    </li>
  );
}

export default BlogCard;
