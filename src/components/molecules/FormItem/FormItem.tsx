import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import { get } from 'lodash';

import styles from './FormItem.module.scss';

export type FormItemProps = {
  name: string;
  label: string;
  children: ReactNode;

  help?: string;
  className?: string;
};

export function FormItem(props: FormItemProps) {
  const { name, label, children, className, help } = props;

  const { formState } = useFormContext();

  const error = get(formState.errors, name) as { message: string } | undefined;

  return (
    <div className={classNames(className)}>
      <label className={styles.label}>{label}</label>
      <div className={styles.content}>{children}</div>
      {!!help && !error && <div className={styles.help}>{help}</div>}
      {!!error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
}
