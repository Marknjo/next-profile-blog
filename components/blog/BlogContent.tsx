import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Prism as Highlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import BlogModel from '../../lib/BlogModel';
import styles from './BlogContent.module.css';

const BlogContent = ({ blog }: { blog: BlogModel }) => {
  const blogContent = blog.content! as string;

  const customRenderers = {
    p(paragraph: any) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className={styles.image}>
            <Image
              src={`/images/posts/${blog.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    code(code: any) {
      const { className, children } = code;
      const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
      return (
        <Highlighter style={atomDark} language={language}>
          {children}
        </Highlighter>
      );
    },
  };

  return (
    <article className={styles.content}>
      <header>
        <p>Post heading</p>
      </header>

      <div>
        <ReactMarkdown components={customRenderers}>
          {blogContent}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogContent;
