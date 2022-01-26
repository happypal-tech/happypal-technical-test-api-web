import { Navigate, useParams } from 'react-router';

import { numberWithThousandSeparator } from '../../../helpers/numberWithThousandSeparator';

import { CarouselPictures } from '@molecules/CarouselPictures/CarouselPictures';
import { OwnedProduct } from '@organisms/OwnedProduct/OwnedProduct';

import styles from './ProductsIdView.module.scss';

import { useProductsIdViewQuery } from './ProductsIdView.generated';

export function ProductsIdView() {
  const { productId } = useParams<{ productId: string }>();

  if (!productId) {
    return <Navigate to="/products" />;
  }

  const { data, loading } = useProductsIdViewQuery({ variables: { productId } });

  const product = data?.product;

  if (loading) {
    // TODO: Implement a nice loader ?
    return <div>Chargement</div>;
  } else if (!product) {
    // TODO: Implement a nice error screen ?
    return <div>Erreur</div>;
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.product}>
        <div>
          {!!product.pictures.length && <CarouselPictures pictures={product.pictures} productName={product.name} />}
        </div>
        <div>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <div className={styles.productSeller}>
            {/* TODO: Implement a seller page with contact */}
            Vendeur : {product.owner.firstName} {product.owner.lastName}
          </div>
          <div className={styles.productPrice}>
            {numberWithThousandSeparator(product.priceValue)} {product.priceCurrency}
          </div>
          <div className={styles.productDescription}>{product.description}</div>
        </div>
      </section>
      <section className={styles.ownedProducts}>
        <h2 className={styles.ownedProductsTitle}>Du même vendeur</h2>
        <ul className={styles.ownedProductsWrapper}>
          {product.owner.ownedProductsPagination.nodes
            .filter((node) => node.id !== product.id)
            .map((node) => (
              <OwnedProduct product={node} key={`node_${node.id}`} />
            ))}
        </ul>
      </section>
    </div>
  );
}
