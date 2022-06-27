import Image from 'next/image';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <nav className={styles.image}>
        <Image
          src="/images/site/mark-njoroge.jpg"
          alt="Picture of Mark Njoroge"
          width="300"
          height="300"
          layout="responsive"
        />
      </nav>
      <h1>Hi, I am Mark Njoroge</h1>

      <p>
        I blog about web development, the JavaScript ecosystem. I talk about
        backend code with NodeJs and frameworks like Express, Koa, Fastify and
        NestJs. On frontend, I dive into React and Svelte. In between, the
        web-hybrids, cutting across backend and frontend. You will find me
        sharing on NextJs, Remix, and Svelte Toolkit.
      </p>
      <p>Shall we dive in?</p>
    </section>
  );
}

export default Hero;
