import { Outlet } from 'react-router';

import { AppHeader } from '../AppHeader/AppHeader';

export function AppLayout() {
  return (
    <div>
      <AppHeader />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
