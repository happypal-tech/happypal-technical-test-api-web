import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './ProductCard.module.scss';

import { ProductCardFragment } from './ProductCard.generated';

export type ProductCardProps = {
  product: ProductCardFragment;
  className?: string;
};

export function ProductCard(props: ProductCardProps) {
  const { className, product } = props;

  return (
    <Link to={`/products/${product.id}`} className={classNames(styles.root, className)}>
      {product.name}
    </Link>
  );
}
