import Image from 'next/image';
import styles from './BlogContentHeader.module.css';

interface BlogContentHeaderProps {
  title: string;
  imgSrc: string;
}

const BlogContentHeader = ({ title, imgSrc }: BlogContentHeaderProps) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <Image src={imgSrc} alt={title} height={150} width={200} />
    </header>
  );
};

export default BlogContentHeader;
