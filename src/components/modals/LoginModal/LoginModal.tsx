import { LoginForm } from '@components/forms/LoginForm/LoginForm';
import { BaseModal, ChildModalProps } from '@modals/_baseModal/_baseModal';

export type LoginModal = ChildModalProps;

export function LoginModal(props: ChildModalProps) {
  const { ...rest } = props;

  return (
    <BaseModal id="LoginModal" title="Connexion" {...rest}>
      <LoginForm />
    </BaseModal>
  );
}
