import Image from 'next/image';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/mark-njoroge.png"
          alt="Picture of Mark Njoroge"
          width="300"
          height="300"
          layout="responsive"
        />
      </div>
      <h1>Hi, I am Mark Njoroge</h1>
      <div className={styles.content}>
        <p>
          I blog about web development, the JavaScript ecosystem. I talk about
          backend code with NodeJs - frameworks like Express, Koa, Fastify and
          NestJs. On frontend, I dive into React and Svelte. In between, the
          web-hybrids cutting across backend and frontend, like NextJs, Remix,
          and Svelte Toolkit.
        </p>
        <p>Feeling like you can relate?</p>
        <p>Let us explore.</p>
      </div>
    </section>
  );
}

export default Hero;
