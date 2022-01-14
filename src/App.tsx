import { Route, Routes } from 'react-router';

import { AppLayout } from '@components/organisms/AppLayout/AppLayout';
import { IndexView } from '@components/views/IndexView/IndexView';
import { ProductsIdView } from '@components/views/ProductsIdView/ProductsIdView';
import { ProductsIndexView } from '@components/views/ProductsIndexView/ProductsIndexView';
import { ProductsView } from '@components/views/ProductsView/ProductsView';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<IndexView />} />
          <Route path="products" element={<ProductsView />}>
            <Route path=":productId" element={<ProductsIdView />} />
            <Route index element={<ProductsIndexView />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
