import { useApolloClient } from '@apollo/client';
import axios from 'axios';
import classNames from 'classnames';
import * as Yup from 'yup';

import { useAuth } from '@hooks/auth/auth.hooks';
import { Button } from '@components/atoms/Button/Button';
import { BaseForm, FormProps, useForm } from '@components/forms/_baseForm/_baseForm';
import { FormInput } from '@components/molecules/FormInput/FormInput';
import { FormItem } from '@components/molecules/FormItem/FormItem';

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  className?: string;
  defaultValues?: Partial<LoginFormValues>;
  onSuccess?: () => void;
  onFailure?: () => void;
};

export function LoginForm(props: LoginFormProps) {
  const { className, defaultValues, onSuccess, onFailure } = props;
  const { login } = useAuth();
  const { resetStore } = useApolloClient();

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  }).required();

  const form = useForm<LoginFormValues>({
    validationSchema,
    defaultValues,
  });

  const handleSubmit: FormProps<LoginFormValues>['onValid'] = async (values) => {
    try {
      await login(values);
      await resetStore();

      onSuccess?.();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.data?.message) {
          case 'auth/invalid-password':
            form.setError('password', { message: 'Mot de passe invalide' });
            break;
          case 'auth/user-not-found':
            form.setError('email', { message: 'Utilisateur introuvable' });
            break;
          default:
            form.setError('email', { message: 'Une erreur est survenue' });
            break;
        }
      } else {
        form.setError('email', { message: 'Une erreur est survenue' });
      }

      onFailure?.();
    }
  };

  return (
    <BaseForm id="LoginForm" className={classNames(className)} onValid={handleSubmit} form={form}>
      <FormItem label="Adresse e-mail" name="email">
        <FormInput name="email" />
      </FormItem>
      <FormItem label="Mot de passe" name="password">
        <FormInput type="password" name="password" />
      </FormItem>
      <Button type="submit">Connexion</Button>
    </BaseForm>
  );
}
