import Image from 'next/image';
import { FC, ReactNode, useMemo } from 'react';

import { Prism as Highlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { getMDXComponent } from 'mdx-bundler/client';
import BlogModel from '../../lib/BlogModel';
import styles from './BlogContent.module.css';

import 'prismjs/themes/prism-okaidia.min.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

interface BlogContentProps {
  children: ReactNode;
}

const pComponent = (slug: string) => {
  const Paragraph: FC<{ [key: string]: any }> = props => {
    if (typeof props.children !== 'string' && props.children.type === 'img') {
      const src = props.children.props.src;
      const alt = props.children.props.alt;

      return (
        <div className={styles.image}>
          <Image
            src={`/images/posts/${slug}/${src}`}
            alt={alt}
            width={600}
            height={300}
          />
        </div>
      );
    }
    return <p {...props} />;
  };

  return Paragraph;
};

const PreComponent: FC<{ [key: string]: any }> = props => {
  const language = props.className.split('-').at(-1);

  return (
    <div className={styles['code-block']}>
      <div className={styles.langOkaidia}>{language}</div>
      <pre {...props} />
    </div>
  );
};

const BlogContent = ({
  blog,
  frontmatter,
}: {
  blog: string;
  frontmatter: BlogModel;
}) => {
  const { slug } = frontmatter;
  const Component = useMemo(() => getMDXComponent(blog), [blog]);
  const ParaComp = useMemo(() => pComponent(slug), [slug]);

  return (
    <article className={styles.content}>
      <header>
        <h1>{frontmatter.title}</h1>
      </header>

      <Component components={{ p: ParaComp, pre: PreComponent }} />
    </article>
  );
};

export default BlogContent;
