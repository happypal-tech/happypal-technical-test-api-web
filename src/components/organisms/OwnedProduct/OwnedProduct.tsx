import { Link } from 'react-router-dom';

import { numberWithThousandSeparator } from '../../../helpers/numberWithThousandSeparator';

import { ProductCardFragment } from '@organisms/ProductCard/ProductCard.generated';

import styles from './OwnedProduct.module.scss';

export type OwnedProductProps = {
  product: ProductCardFragment;
  className?: string;
};

export function OwnedProduct(props: OwnedProductProps) {
  const { product } = props;

  return (
    <li>
      {!!product.pictures.length && (
        <div>
          {product.pictures.slice(0, 1).map((picture) => {
            return (
              <Link to={`/products/${product.id}`} key={`product_${product.id}`}>
                <img
                  src={picture.url}
                  alt={picture.originalName ?? product.name}
                  className={styles.ownedProductPicture}
                />
              </Link>
            );
          })}
        </div>
      )}
      <Link to={`/products/${product.id}`}>{product.name}</Link>
      <div>
        <Link to={`/products/${product.id}`}>
          <span className={styles.ownedProductPrice}>
            {numberWithThousandSeparator(product.priceValue)} {product.priceCurrency}
          </span>
        </Link>
      </div>
    </li>
  );
}
