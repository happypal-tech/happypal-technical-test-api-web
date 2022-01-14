/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UnpackNestedValue,
  useForm as rhUseForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import { ApolloError } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import classnames from 'classnames';
import { SchemaOf } from 'yup';

// import styles from './Form.module.css';

export const useForm = <T extends FieldValues>({
  validationSchema,
  ...props
}: UseFormProps<T> & { validationSchema: SchemaOf<T> }) => {
  return rhUseForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    ...props,
  });
};

export const BaseForm = <T extends FieldValues = FieldValues, M = any>(props: FormProps<T, M>) => {
  const { id, className, form, onValid, onInvalid, onSuccess, onFailure, children } = props;

  const handleValid: SubmitHandler<T> = async (values, event) => {
    try {
      const data = await onValid(values, event);

      if (onSuccess) {
        await onSuccess(data, values);
      }
    } catch (err) {
      if (onFailure) {
        await onFailure(err as unknown as ApolloError, values);
      } else {
        throw err;
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form id={id} className={classnames(className)} onSubmit={form.handleSubmit(handleValid, onInvalid)}>
        {children}
      </form>
    </FormProvider>
  );
};

export type FormProps<T extends FieldValues = FieldValues, M = any> = {
  id: string;
  className?: string;
  form: UseFormReturn<T>;
  children: ReactNode;
  onValid: (...args: Parameters<SubmitHandler<T>>) => Promise<M>;
  onInvalid?: SubmitErrorHandler<T>;
  onSuccess?: (result: M, data: UnpackNestedValue<T>) => void | Promise<void>;
  onFailure?: (err: ApolloError, data: UnpackNestedValue<T>) => void | Promise<void>;
};

export type ChildFormProps<T extends FieldValues = FieldValues, M = any> = Pick<
  FormProps<T, M>,
  'onSuccess' | 'onFailure'
> & {
  onSubmit?: (data: UnpackNestedValue<T>) => void;
};
