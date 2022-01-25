import { Link } from 'react-router-dom';

import { ProductCardFragment } from '@organisms/ProductCard/ProductCard.generated';

export type OwnedProductsProps = {
  product: ProductCardFragment;
  className?: string;
};

export function OwnedProducts(props: OwnedProductsProps) {
  const { product } = props;

  return (
    <Link to={`/products/${product.id}`}>
      {!!product.pictures.length && (
        <div>
          {product.pictures.slice(0, 1).map((picture) => {
            return (
              <img
                src={picture.url}
                alt={picture.originalName ?? product.name}
                key={`product_${product.id}`}
                width="150px"
              />
            );
          })}
        </div>
      )}
      {product.name}
      <div>
        {product.priceValue} {product.priceCurrency}
      </div>
    </Link>
  );
}
