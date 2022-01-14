import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import styles from './_baseModal.module.scss';

export type BaseModalProps = ChildModalProps & {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export type ChildModalProps = {
  onClose: () => void;
  closeOnOverlayClick?: boolean;
};

const modalRoot = document.getElementById('modal-root');

export function BaseModal(props: BaseModalProps) {
  const { children, className, title, closeOnOverlayClick, onClose } = props;

  const [container] = useState(() => {
    // This will be executed only on the initial render
    // https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
    return document.createElement('div');
  });

  useEffect(() => {
    modalRoot?.appendChild(container);

    return () => {
      modalRoot?.removeChild(container);
    };
  }, []);

  const handleOverlayClick = () => {
    if (closeOnOverlayClick !== false) {
      onClose?.();
    }
  };

  const wrapper = (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={classNames(className, styles.content)} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.close} onClick={onClose}>
            X
          </div>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );

  return createPortal(wrapper, container);
}
