import { ProductCard } from '@components/organisms/ProductCard/ProductCard';

import styles from './ProductsIndexView.module.scss';

import { useProductsIndexViewQuery } from './ProductsIndexView.generated';

export function ProductsIndexView() {
  // TODO: Implement Pagination ?
  const { data, loading } = useProductsIndexViewQuery({
    variables: {
      skip: 0,
      take: 8,
    },
  });

  if (loading) {
    // TODO: Implement a nice loader ?
    return <div>Chargement</div>;
  } else if (!data) {
    // TODO: Implement a nice error screen ?
    return <div>Erreur</div>;
  }

  return (
    <div>
      <div className={styles.cards}>
        {data.productsPagination.nodes.map((node) => (
          <ProductCard product={node} key={`node_${node.id}`} />
        ))}
      </div>
    </div>
  );
}
