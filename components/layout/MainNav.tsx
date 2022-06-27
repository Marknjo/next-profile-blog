import Link from 'next/link';
import Logo from './Logo';
import styles from './MainNav.module.css';

function MainNav() {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>

      <nav>
        {/* Navigation */}
        <ul>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNav;
