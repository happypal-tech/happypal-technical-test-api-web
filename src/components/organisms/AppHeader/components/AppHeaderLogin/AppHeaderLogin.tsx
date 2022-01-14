import { useState } from 'react';

import { LoginModal } from '@components/modals/LoginModal/LoginModal';

export function AppHeaderLogin() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Login</button>
      {isOpen && <LoginModal onClose={() => setOpen(false)} />}
    </>
  );
}
