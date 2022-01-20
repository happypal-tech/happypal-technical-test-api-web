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

  const pageCount: number | null = data ? Math.ceil(data.productsPagination.totalCount / productPerPage) : null;
  const isLastPage = pageCount !== null && pageCount === currentPage + 1;

  const nextPage = (): void => {
    if (!isLastPage) {
      setPage(currentPage + 1);
    }
  };

  const prevPage = (): void => {
    if (currentPage > 0) {
      setPage(currentPage - 1);
    }
  };

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
        <button className={styles.paginationButton} onClick={prevPage} disabled={currentPage < 1}>
          Prev.
        </button>
        <span>
          {currentPage + 1} / {pageCount}
        </span>
        <button className={styles.paginationButton} onClick={nextPage} disabled={isLastPage}>
          Next
        </button>
      </div>
    </div>
  );
}
