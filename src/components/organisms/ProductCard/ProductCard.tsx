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
      <div>
        {product.pictures.length > 0 ? (
          <div className={classNames(styles.picture)}>
            <picture>
              <img
                src={product.pictures[0].url}
                alt={product.pictures[0].originalName ? product.pictures[0].originalName : ''}
              />
            </picture>
          </div>
        ) : (
          <div className={classNames(styles.noPhoto)}>
            <p>no photo</p>
          </div>
        )}

        <p>{product.name}</p>
      </div>
    </Link>
  );
}
