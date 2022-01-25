import { Navigate, useParams } from 'react-router';

import { OwnedProducts } from '@organisms/OwnedProducts/OwnedProducts';

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
    <div>
      <pre>{JSON.stringify(product, null, 2)}</pre>
      <section>
        <h2>Du même vendeur</h2>
        {product.owner.ownedProductsPagination.nodes
          .filter((node) => node.id !== product.id)
          .map((node) => (
            <OwnedProducts product={node} key={node.id} />
          ))}
      </section>
    </div>
  );
}
