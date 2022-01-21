import { useState } from 'react';

import { ProductCard } from '@components/organisms/ProductCard/ProductCard';
import { Loader } from '@molecules/Loader/Loader';

import styles from './ProductsIndexView.module.scss';

import { useProductsIndexViewQuery } from './ProductsIndexView.generated';

export function ProductsIndexView() {
  const [currentPage, setPage] = useState<number>(0);
  const productPerPage = 4;

  const { data, loading } = useProductsIndexViewQuery({
    variables: {
      skip: currentPage * productPerPage,
      take: productPerPage,
    },
  });

  // TODO => renvoie toujours true si il y a des data. Erreur API ?
  console.log(data?.productsPagination.pageInfo.hasPreviousPage);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  } else if (!data) {
    // TODO: Implement a nice error screen ?
    return <div>Erreur</div>;
  }

  return (
    <div>
      <div className={styles.cards}>
        {data.productsPagination.nodes.map((node) => (
          <ProductCard product={node} key={node.id} />
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <button className={styles.paginationButton} onClick={() => setPage(currentPage - 1)} disabled={currentPage < 1}>
          Prev.
        </button>
        <span>
          {currentPage + 1} / {data.productsPagination.pageInfo.pageCount}
        </span>
        <button
          className={styles.paginationButton}
          onClick={() => setPage(currentPage + 1)}
          disabled={!data.productsPagination.pageInfo.hasNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
