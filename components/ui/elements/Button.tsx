import Link from 'next/link';
import styles from './Button.module.css';
import {
  ButtonAttributes,
  GenericFunction,
  GenericProps,
} from '../../../types';

interface props extends GenericProps {
  type?: ButtonAttributes;
  href?: string;
  onClick?: GenericFunction;
  className?: string;
}

const Button = ({ className, type, href, onClick, children }: props) => {
  const definedClassName = `${styles.btn} ${className ? className : ''}`;
  if (href) {
    return (
      <Link href={href}>
        <a className={definedClassName}>{children}</a>
      </Link>
    );
  }

  let buttonData = {
    type: (type ? type : 'button') as ButtonAttributes,
    className: definedClassName,
    ...(onClick ? { onClick } : {}),
  };

  return (
    <button {...buttonData}>
      <>{children}</>
    </button>
  );
};

export { Button };
